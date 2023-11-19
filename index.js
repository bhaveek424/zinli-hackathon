import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import express from 'express';

const app = express();
// Get port, or default to 3000
// app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));
const PORT = process.env.PORT || 3000;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on('messageCreate', (message) => {
  message.reply({ content: 'Hello from Bot!' });
});

client.login(process.env.DISCORD_TOKEN);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
