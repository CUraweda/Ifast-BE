import { ApprovalIfast } from './ifast.approval.js';

export const ifastModule = {
  permohonan: async (prompt, jid) => {
    await ApprovalIfast(prompt, jid)
  },
};
