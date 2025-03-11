import BaseController from '../../base/controller.base.js';
import ApprovalService from './approval.service.js';

class ApprovalController extends BaseController {
  #service = new ApprovalService();

  updateApproval = this.wrapper(async (req, res) => {
    const { id } = req.params; // approval ID
    const { status, comment } = req.body;
    // Gunakan req.user.id sebagai approverId
    const data = await this.#service.updateApprovalStatus(id, status, comment, req.user.id);
    return this.ok(res, data, "Approval berhasil diperbarui");
  });
}

export default ApprovalController;
