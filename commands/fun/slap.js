const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slap a user!')
        .addUserOption(option => option.setName('target').setDescription('The user to slap').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setDescription(`**${user.username}** slapped **${target.username}**! 👋`)
            .setImage('https://media.giphy.com/media/l4Epf9N93W7v635ks/giphy.gif'); // Example Giphy link

        await interaction.reply({ embeds: [embed] });
    },
};
