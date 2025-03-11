// src/core/approval/approval.service.js
import BaseService from '../../base/service.base.js';
import prisma from '../../config/prisma.db.js';

class ApprovalService extends BaseService {
  constructor() {
    super(prisma);
  }

  /**
   * Mengubah status approval.
   * Hanya boleh diupdate oleh approver yang ditunjuk.
   * Approval harus dilakukan berurutan: approval dengan sequence N hanya dapat diupdate
   * jika semua approval dengan sequence lebih kecil sudah disetujui.
   *
   * @param {string} approvalId
   * @param {string} status - APPROVED atau REJECTED
   * @param {string} comment
   * @param {string} approverId - didapat dari req.user.id
   * @returns Approval record yang telah diperbarui
   */
  updateApprovalStatus = async (approvalId, status, comment, approverId) => {
    // Ambil record approval target
    const approval = await this.db.approval.findUnique({ where: { id: approvalId } });
    if (!approval) throw new Error("Approval record not found");

    // Pastikan user yang login adalah approver yang ditunjuk
    if (approval.approverId !== approverId)
      throw new Error("Anda tidak memiliki akses untuk mengupdate approval ini");

    // Pastikan bahwa semua approval dengan sequence lebih kecil sudah disetujui
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

    // Update status approval
    const updated = await this.db.approval.update({
      where: { id: approvalId },
      data: { status, comment },
    });
    return updated;
  };
}

export default ApprovalService;
