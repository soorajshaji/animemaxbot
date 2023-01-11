const TelegramBot = require('node-telegram-bot-api');

const token = '5926132541:AAGH5bZtH1NNI9yCkKfx_yNU3Ei5PR7l-4k';

const bot = new TelegramBot(token, { polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === '/start') {
    bot.sendMessage(chatId, 'Hello');
  }
    
  

});