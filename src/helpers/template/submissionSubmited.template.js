import dedent from 'dedent';
import FormatRupiah from '../rupiahFormat.js';

const formatSubmissionMessage = (submission, approver, user, approvalData) => {
  const totalAmount = submission.submissionDetail.reduce(
    (sum, detail) => sum + detail.amount * detail.qty,
    0
  );
  const level = approver ;

  return dedent`IFAST

  Permohonan ${submission.type.name} Nomor *${submission.number}* oleh _${user.fullName}_ pada tanggal ${new Date(submission.date).toLocaleDateString()} pukul ${new Date(submission.createdAt).toLocaleTimeString()} sedang menunggu approval level ${level.sequence} oleh ${level.requiredRole
  } (${approvalData.fullName})
  
  Detail Pengajuan:
  - Activity : ${submission.activity}
  - Project : ${submission.project.name}
  - Deskripsi : ${submission.description}
  - Type : ${submission.type.name}
  
  Rincian Pengajuan:
  ${submission.submissionDetail.map((detail, i) =>`${i + 1}. ${detail.name} | ${detail.qty} | ${FormatRupiah(detail.amount)} | ${FormatRupiah(detail.amount * detail.qty)}`).join('\n')}
  
  Total Pengajuan: ${FormatRupiah(totalAmount)}


  > _automatic message created by MIRA © curaweda.com_

  `;
};

export default formatSubmissionMessage;
