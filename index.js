const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
const express = require('express');

// --- EXPRESS SERVER (Keep alive) ---
const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('Shadow is running!'));
app.listen(PORT, '0.0.0.0');

// --- BOT SETUP ---
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('clientReady', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // Register the slash command
    const commands = [{ name: 'ping', description: 'Replies with Pong!' }];
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    
    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log('Successfully registered slash command.');
    } catch (error) {
        console.error(error);
    }
});

// --- COMMAND HANDLING (Embeds) ---
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        const pingEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🏓 Pong!')
            .setDescription(`Latency is ${client.ws.ping}ms.`)
            .setTimestamp()
            .setFooter({ text: 'Shadow Bot' });

        await interaction.reply({ embeds: [pingEmbed] });
    }
});

client.login(process.env.TOKEN);
