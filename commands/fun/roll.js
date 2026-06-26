const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a dice between 1 and 6'),
    async execute(interaction) {
        const result = Math.floor(Math.random() * 6) + 1;
        const embed = new EmbedBuilder()
            .setTitle('🎲 Dice Roll')
            .setDescription(`You rolled a **${result}**!`)
            .setColor('#FFD700');

        await interaction.reply({ embeds: [embed] });
    },
};
