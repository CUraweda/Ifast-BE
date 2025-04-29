// aggregatorWhatsapp.service.js
import prism from '../../config/prisma.db.js';
import { handlePromptCommand } from '../handler/promptCommandHandler.js';
import { fallbackMessage } from '../handler/promptHandlers.js';

import { getWhatsappClient } from '../../utils/whatsappClient.js';

export const IncomingMessages = async (messageUpdate) => {
  const messages = messageUpdate.messages || [];
  
  if (messages.length === 0) return;

  const jid = messages[0].key.remoteJid;
  const phoneNumber = jid.split('@')[0];
  const user = await prism.user.findFirst({ where: { phoneWA: phoneNumber } });
  // if (!user) return;

  for (const msg of messages) {
    if (!msg.key.fromMe && !msg.broadcast ) {
      console.log(msg);
      // if (!user.isVerified) {
      //   const client = getWhatsappClient();
      //   await client.sendMessage(jid, {
      //     text: `Halo ${user.fullName}, maaf ya kamu belum terverifikasi. Silakan verifikasi akun kamu terlebih dahulu.`
      //   });
      //   return;
      // }

      // const text = extractMessageText(msg);
      // if (text && text.length > 1) {
      //   await handlePromptCommand(text, msg); // 💥 langsung kirim ke ML model
      // }
    }
  }
};

// 🧠 Mengambil isi pesan
const extractMessageText = (msg) => {
  if (msg.message?.conversation) return msg.message.conversation;

  if (msg.message?.extendedTextMessage?.text) {
    const quoted = msg.message.extendedTextMessage.contextInfo?.quotedMessage;
    const contextText = quoted?.conversation || '';
    const prompt = `${contextText} [${msg.message.extendedTextMessage.text}]`;
    return prompt;
  }

  if (msg.message?.imageMessage?.caption) return msg.message.imageMessage.caption;

  return '';
};

// Cek apakah pesan dari grup
const isGroupMessage = (msg) => {
  const jid = msg.key.remoteJid;
  return jid && jid.endsWith('@g.us');
};
