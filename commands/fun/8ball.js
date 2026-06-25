const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../embedHelper');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8-ball a question.')
        .addStringOption(option => option.setName('question').setDescription('Your question').setRequired(true)),
    async execute(interaction) {
        const answers = ['Yes.', 'No.', 'Maybe.', 'Ask again later.', 'Definitely.', 'Cannot predict now.'];
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        
        const embed = createEmbed('🎱 Magic 8-Ball', `**Question:** ${interaction.options.getString('question')}\n**Answer:** ${randomAnswer}`);
        await interaction.reply({ embeds: [embed] });
    },
};
