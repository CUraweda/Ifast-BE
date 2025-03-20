import formatSubmissionMessage from '../../../helpers/template/submissionSubmited.template.js';
import { getWhatsappClient } from '../../../utils/whatsappClient.js';
import ApprovalService from '../../approval/approval.service.js';
import SubmissionService from '../../submission/submission.service.js';
import UserService from '../../user/user.service.js';
import WhatsappService from '../../whatsapp/whatsapp.service.js';

export const ApprovalIfast = async (prompt, jid) => {
  try {
    const approvalService = new ApprovalService();
    const submissionService = new SubmissionService();
    const userService = new UserService();
    const client = getWhatsappClient();

    const nomorRegex = /Nomor \*(.*?)\*/;
    const nomorMatch = prompt.match(nomorRegex);
    const nomorValue = nomorMatch ? nomorMatch[1] : null;
    const bracketRegex = /\[(.*?)\]/;
    const bracketMatch = prompt.match(bracketRegex);
    const bracketValue = bracketMatch ? bracketMatch[1].toLowerCase() : null;

    const Comment =
      bracketValue === 'approve'
        ? bracketValue
        : bracketValue.split('-')[0].trim();

    if (Comment !== 'approve' && Comment !== 'reject') {
      await client.sendMessage(jid, {
        text: `Mohon maaf, sepertinya kamu salah memasukan perintah 🫣`,
      });
      return;
    }

    const submission = await submissionService.findByNumber(nomorValue);
    const sortedApprovals = submission.approval.sort(
      (a, b) => a.sequence - b.sequence
    );

    let displayApproval = sortedApprovals.find(
      (approval) => approval.status !== 'APPROVED'
    );

    console.log(jid);

    if (!displayApproval) {
      await client.sendMessage(jid, {
        text: `permohonan nomor ${submission.number} telah selesai di approval, terimakasih ☺️`,
      });
      return;
    }

    const phoneNumber = jid.split('@')[0];
    const user = await userService.findByPhone(phoneNumber);
    if (displayApproval.approverId !== user.id) {
      await client.sendMessage(jid, {
        text: `permohonan nomor ${submission.number} telah kamu setujui sebelumnya.`,
      });
      return;
    }

    const approver = await userService.findById(sortedApprovals[0].approverId);
    const status =
      bracketValue.toLowerCase() == 'approve' ? 'APPROVED' : 'REJECT';
    const comment =
      bracketValue === 'approve' ? '' : bracketValue.split('-')[1].trim();

    const updatedApproval = await approvalService.updateApprovalStatus(
      displayApproval.id,
      status,
      comment,
      approver.id
    );

    if (updatedApproval) {
      await client.sendMessage(jid, {
        text: `Pengajuan ${
          submission.type.name
        } dengan nomor ${nomorValue} berhasil anda *${status}* ${
          status === 'REJECT' ? `dengan catatan ${comment}` : ''
        }, Pengajuan telah di teruskan ke proses selanjutnya ☺️`,
      });
      await handleSendNextApprove(submission.id);
    }
  } catch (error) {
    console.error('Error in ifastModule.permohonan:', error);
    throw error;
  }
};

export const handleSendNextApprove = async (idSubmission) => {
  const submissionService = new SubmissionService();
  const userService = new UserService();
  const whatsappService = new WhatsappService();

  const submission = await submissionService.findById(idSubmission);
  const sortedApprovals = submission.approval.sort(
    (a, b) => a.sequence - b.sequence
  );

  let displayApproval = sortedApprovals.find(
    (approval) => approval.status !== 'APPROVED'
  );
  const idApproval = displayApproval
    ? displayApproval.approverId
    : sortedApprovals[sortedApprovals.length - 1].approverId;
  const approver = await userService.findById(idApproval);
  const user = await userService.findById(submission.userId);

  const data = {
    number: approver.phoneWA,
    message: '',
  };

  if (!displayApproval) {
    data.message = `permohonan nomor ${submission.number} telah selesai di approval, terimakasih ☺️`;
  } else {
    data.message = formatSubmissionMessage(
      submission,
      displayApproval,
      user,
      approver
    );
  }

  await whatsappService.sendMessage(data);
};
