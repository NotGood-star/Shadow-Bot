const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const express = require('express');
const fs = require('fs');
const path = require('path');

// --- EXPRESS SERVER (Keeps Render Alive) ---
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('Shadow is active!'));
app.listen(PORT, '0.0.0.0', () => console.log(`Web server active on port ${PORT}`));

// --- BOT SETUP ---
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

client.commands = new Collection();

// --- COMMAND LOADER ---
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        client.commands.set(command.data.name, command);
    }
}

// --- INTERACTION HANDLER ---
client.on('interactionCreate', async (interaction) => {
    // 1. Slash Command Logic
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try { await command.execute(interaction); } 
        catch (error) { console.error(error); await interaction.reply({ content: 'Error!', ephemeral: true }); }
    }
    // 2. Ticket Dropdown Logic (Will be added in your ticket files)
    else if (interaction.isStringSelectMenu()) {
        // Handle your ticket interactions here later
    }
});

client.once('ready', () => console.log(`Logged in as ${client.user.tag}!`));
client.login(process.env.TOKEN);
