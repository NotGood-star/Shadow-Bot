const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
const express = require('express');

// --- EXPRESS SERVER (Keeps your bot alive on Render) ---
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => res.send('Shadow is active!'));
app.listen(PORT, '0.0.0.0', () => console.log(`Web server running on port ${PORT}`));

// --- DISCORD CLIENT INITIALIZATION ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// --- SLASH COMMAND REGISTRATION ---
client.once('ready', async () => {
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

// --- INTERACTION HANDLER ---
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

// --- LOGIN ---
client.login(process.env.TOKEN);
