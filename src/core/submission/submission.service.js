import BaseService from '../../base/service.base.js';
import prisma from '../../config/prisma.db.js';
import whatsappService from '../whatsapp/whatsapp.service.js';
import dedent from 'dedent';
import FormatRupiah from '../../helpers/rupiahFormat.js';
import formatSubmissionMessage from '../../helpers/template/submissionSubmited.template.js';

class SubmissionService extends BaseService {
  WhatsappService;
  constructor() {
    super(prisma);
    this.WhatsappService = new whatsappService();
  }

  findAll = async (query) => {
    const q = this.transformBrowseQuery(query);
    q.include = {
      approval: { orderBy: { sequence: 'asc' } },
      type: true,
      submissionDetail: true,
    };

    const data = await this.db.submission.findMany({
      ...q,
      orderBy: { createdAt: 'desc' },
    });

    const transformed = data.map((submission) => {
      const totalAmount = submission.submissionDetail.reduce(
        (sum, detail) => sum + detail.amount * detail.qty,
        0
      );

      const approvals = submission.approval || [];
      let displayApproval;

      if (approvals.length) {
        displayApproval = approvals.find(
          (a) => a.status === 'CHECKED' || a.status === 'REJECT'
        );
        if (!displayApproval) {
          displayApproval = approvals[approvals.length - 1];
        }
      }
      return {
        ...submission,
        totalAmount,
        approval: displayApproval ? [displayApproval] : [],
      };
    });

    if (query.paginate) {
      const countData = await this.db.submission.count({ where: q.where });
      return this.paginate(transformed, countData, q);
    }
    return transformed;
  };

  findById = async (id) => {
    const submission = await this.db.submission.findUnique({
      where: { id },
      include: {
        approval: true,
        project: true,
        type: true,
        submissionDetail: {
          include: { category: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    const totalAmount = submission.submissionDetail.reduce(
      (sum, detail) => sum + detail.amount * detail.qty,
      0
    );

    const SERVER_URL = process.env.SERVER_URL;
    const transformedDetails = submission.submissionDetail.map((detail) => ({
      ...detail,
      evidence: detail.evidence
        ? `${SERVER_URL}/api/download?path=${encodeURIComponent(
            detail.evidence
          )}`
        : null,
    }));

    return { ...submission, submissionDetail: transformedDetails, totalAmount };
  };
  
  findByNumber = async (number) => {
    const submission = await this.db.submission.findFirst({
      where: { number },
      include: {
        approval: true,
        project: true,
        type: true,
        submissionDetail: {
          include: { category: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    const totalAmount = submission.submissionDetail.reduce(
      (sum, detail) => sum + detail.amount * detail.qty,
      0
    );

    const SERVER_URL = process.env.SERVER_URL;
    const transformedDetails = submission.submissionDetail.map((detail) => ({
      ...detail,
      evidence: detail.evidence
        ? `${SERVER_URL}/api/download?path=${encodeURIComponent(
            detail.evidence
          )}`
        : null,
    }));

    return { ...submission, submissionDetail: transformedDetails, totalAmount };
  };

  create = async (payload) => {
    return await this.db.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: payload.userId },
        include: { hirarky: { include: { levels: true } } },
      });

      const type = await tx.typeSubmission.findFirst({
        where: { id: payload.typeId },
      });
      if (!type) throw new NotFound('type tidak ditemukan');
      const submissions = await this.db.submission.count({
        where: {
          typeId: type.id,
        },
      });
      const date = new Date();
      const number = `${type.code}-${date.getFullYear()}-${submissions + 1}`;
      const submission = await tx.submission.create({
        data: { ...payload, number },
      });

      if (user && user.hirarky && user.hirarky.levels.length) {
        for (const level of user.hirarky.levels) {
          await tx.approval.create({
            data: {
              submissionId: submission.id,
              sequence: level.sequence,
              requiredRole: level.requiredRole,
              status: 'CHECKED',
              approverId: level.approverId,
            },
          });
        }
      }
      return submission;
    });
  };

  update = async (id, payload) => {
    const res = await this.db.submission.update({
      where: { id },
      data: payload,
      include: {
        type: true,
        submissionDetail: { include: { category: true } },
        project: true
      },
    });
    if (!res) return;
    const user = await this.db.user.findUnique({
      where: { id: res.userId },
      include: { hirarky: { include: { levels: true } } },
    });

    if (payload.status === 'SUBMITED') {
      const filteredLevels = user.hirarky.levels.filter(
        (level) => level.sequence === 1
      );

      const approver = await this.db.user.findUnique({
        where: { id: filteredLevels[0].approverId },
      });
      const jid = approver.phoneWA;

      const data = {
        number: jid,
        message: formatSubmissionMessage(res, filteredLevels[0], user, approver),
      };

      await this.WhatsappService.sendMessage(data);
      return res;
    }
  };

  delete = async (id) => {
    return await this.db.submission.delete({ where: { id } });
  };
}

export default SubmissionService;
