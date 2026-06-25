const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../embedHelper'); // Adjust path as needed

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks the bot latency!'),
    async execute(interaction) {
        // Calculate latency
        const latency = Date.now() - interaction.createdTimestamp;
        
        // Use our Embed Helper
        const embed = createEmbed('🏓 Pong!', `Latency is ${latency}ms\nAPI Latency is ${interaction.client.ws.ping}ms`);
        
        await interaction.reply({ embeds: [embed] });
    },
};
