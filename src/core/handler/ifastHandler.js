import { getWhatsappClient } from '../../utils/whatsappClient.js';
import { ifastModule } from '../modul/ifast/ifast.agregator.js';
import { loadPromptData } from '../../prompts/index.js'; 

const promptData = loadPromptData();

export const handleIfast = async (prompt, msg) => {
  const client = getWhatsappClient();
  const jid = msg.key.remoteJid;
  const lowerPrompt = prompt.toLowerCase();

  const ifastSubHandlers = {
    permohonan: ifastModule.permohonan
  };

  let found = false;
  for (const [keyword, handler] of Object.entries(ifastSubHandlers)) {
    if (lowerPrompt.includes(keyword.toLowerCase())) {
      await handler(prompt, jid);
     
      found = true;
      break;
    }
  }

  if (!found) {
    await client.sendMessage(jid, { 
      text: `Modul Ifast: perintah tidak dikenali. Silakan periksa perintah Anda.` 
    });
  }
};
