const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// Setup Web Server for Render
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send('Shadow is alive!');
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

// Setup Discord Bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Shadow (ID: ${process.env.CLIENT_ID}) is logged in!`);
});

// Replace 'TOKEN' with your actual env variable key
client.login(process.env.TOKEN);
