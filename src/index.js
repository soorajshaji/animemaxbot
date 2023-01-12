const TelegramBot = require('node-telegram-bot-api');


const t = token;

const bot = new TelegramBot(t, { polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === '/start') {
    bot.sendMessage(chatId, 'How you');
  }
  bot.sendMessage(chatId, 'How you');
    
  

});