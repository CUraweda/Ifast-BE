// src/core/approval/approval.service.js
import BaseService from '../../base/service.base.js';
import prisma from '../../config/prisma.db.js';
import { handleSendNextApprove } from '../modul/ifast/ifast.approval.js';

class ApprovalService extends BaseService {
  constructor() {
    super(prisma);
  }

  updateApprovalStatus = async (approvalId, status, comment, approverId) => {
  
    const approval = await this.db.approval.findUnique({ where: { id: approvalId } });
    if (!approval) throw new Error("Approval record not found");

    if (approval.approverId !== approverId)
      throw new Error("Anda tidak memiliki akses untuk mengupdate approval ini");

    const pendingPrevious = await this.db.approval.findMany({
      where: {
        submissionId: approval.submissionId,
        sequence: { lt: approval.sequence },
        status: { not: "APPROVED" },
      },
    });

    if (pendingPrevious.length > 0) {
      throw new Error("Approval harus dilakukan secara berurutan. Approval level sebelumnya belum disetujui.");
    }

    const updated = await this.db.approval.update({
      where: { id: approvalId },
      data: { status, comment },
    });

    await handleSendNextApprove(updated.submissionId)
    return updated;
  };
}

export default ApprovalService;
