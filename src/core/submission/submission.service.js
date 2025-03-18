import BaseService from '../../base/service.base.js';
import prisma from '../../config/prisma.db.js';

class SubmissionService extends BaseService {
  constructor() {
    super(prisma);
  }

  findAll = async (query) => {
    const q = this.transformBrowseQuery(query);
    q.include = {
      approval: { orderBy: { sequence: "asc" } },
      type: true,
      submissionDetail: true,
    
    };
  
    const data = await this.db.submission.findMany({ ...q , orderBy: {createdAt: "desc"}});
  
    const transformed = data.map((submission) => {
      const totalAmount = submission.submissionDetail.reduce(
        (sum, detail) => sum + detail.amount,
        0
      );
  
      const approvals = submission.approval || [];
      let displayApproval;
  
      if (approvals.length) {
        displayApproval = approvals.find(
          (a) => a.status === "CHECKED" || a.status === "REJECT"
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
    return await this.db.submission.findUnique({
      where: { id },
      include: { approval: true , project: true , type: true},
    });
  };

  create = async (payload) => {
    // Pastikan payload sudah mengandung userId dari controller
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
        data: {...payload, number},
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
    return await this.db.submission.update({ where: { id }, data: payload });
  };

  delete = async (id) => {
    return await this.db.submission.delete({ where: { id } });
  };
}

export default SubmissionService;
