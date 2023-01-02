// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';

// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Create our new bot handler with the token
        // that the Botfather gave us
        // Use an environment variable so we don't expose it in our code
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            const { chat: { id }, text } = body.message;

            // Create a message to send back
            // We can use Markdown inside this
            const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;

            // Send our new message back in Markdown
            await bot.sendMessage(id, message, {parse_mode: 'Markdown'});
            if (text == '/start' || text == '/help') {
            await bot.sendMessage(id, 'Hello! I am a bot that can answer if you send any pincode i will list all areas \nexample send : 226101', {parse_mode: 'Markdown'})
      }
      

      const url = 'https://api.postalpincode.in/pincode/' + parseInt(text);
      const response = await fetch(url);
      const data = await response.json();
    

      if (data[0].Status != 'private')
       await bot.sendMessage(id, "Please Write correct pin" + JSON.stringify(data), {parse_mode: 'Markdown'});

        }
    }
    catch(error) {
        // If there was an error sending our message then we 
        // can log it into the Vercel console
        console.error('Error sending message');
        console.log(error.toString());
    }
    
    // Acknowledge the message with Telegram
    // by sending a 200 HTTP status code
    response.send('OK');
};
