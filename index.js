require('dotenv').config(); // Local testing support
const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
const express = require('express');

// 1. EXPRESS SERVER (Keeps your bot alive on Render)
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => res.send('Shadow is active!'));
app.listen(PORT, '0.0.0.0', () => console.log(`Web server running on port ${PORT}`));

// 2. DISCORD CLIENT INITIALIZATION
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// 3. SLASH COMMAND REGISTRATION
client.once('clientReady', async () => {
    console.log(`Successfully logged in as ${client.user.tag}!`);

    const commands = [
        { name: 'ping', description: 'Checks the bot latency.' }
    ];

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log('Successfully registered slash commands.');
    } catch (error) {
        console.error('Error registering commands:', error);
    }
});

// 4. INTERACTION HANDLER (Using Embeds)
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        const pingEmbed = new EmbedBuilder()
            .setColor(0x2F3136)
            .setTitle('🏓 Pong!')
            .setDescription(`**Latency:** ${client.ws.ping}ms`)
            .setTimestamp()
            .setFooter({ text: 'Shadow Bot System' });

        await interaction.reply({ embeds: [pingEmbed] });
    }
});

// 5. LOGIN
client.login(process.env.TOKEN);
