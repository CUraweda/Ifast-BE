import { getWhatsappClient } from '../../utils/whatsappClient.js';
import { handleIfast } from './ifastHandler.js';
import { loadPromptData } from '../../prompts/index.js';

const promptData = loadPromptData();

export const promptHandlers = {
  handleHelp: async (prompt, msg) => {
    const client = getWhatsappClient();
    const jid = msg.key.remoteJid;
    await client.sendMessage(jid, { text: promptData.general.help });
  },

  handleKenalan: async (prompt, msg) => {
    const client = getWhatsappClient();
    const jid = msg.key.remoteJid;
    await client.sendMessage(jid, { text: promptData.general.kenalan });
  },

  // handleIfast: handleIfast
};

export const fallbackMessage = async (msg) => {
  const client = getWhatsappClient();
  if (!client) return;
  const jid = msg.key.remoteJid;
  await client.sendMessage(jid, { text: promptData.fallback });
};
