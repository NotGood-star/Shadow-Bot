const { Client, GatewayIntentBits } = require('discord.js');

// Initialize client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Bot login using the environment variable you set in Render
client.once('ready', () => {
    console.log(`Successfully logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);
