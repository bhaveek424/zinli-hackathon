import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('messageCreate', async (message) => {
  // Check if the message starts with the verify command
  if (message.content.startsWith('!verify')) {
    // Check if a file is attached
    if (message.attachments.size > 0) {
      const attachment = message.attachments.first();

      // Download the image
      const response = await fetch(attachment.url);
      const imageBuffer = await response.buffer();

      // Send image data to the deepfake detection API
      const apiKey = process.env.DEEPFAKE_API_KEY;
      const apiUrl = 'https://api.deepfakedetection.net/v1/verify';

      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg', // Change content type based on your image type
          'Api-Key': apiKey,
        },
        body: imageBuffer,
      });

      const result = await apiResponse.json();
      // Process the result from the API
      if (result.is_fake) {
        message.reply('Warning: This image appears to be manipulated.');
      } else {
        message.reply('This image seems genuine.');
      }
    } else {
      message.reply('Please attach an image to verify.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
