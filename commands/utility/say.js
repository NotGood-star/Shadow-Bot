const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { createEmbed } = require('../../embedHelper');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot say something in an embed.')
        .addStringOption(option => option.setName('message').setDescription('The message').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const text = interaction.options.getString('message');
        const embed = createEmbed('Announcement', text);
        
        await interaction.reply({ content: 'Sent!', ephemeral: true });
        await interaction.channel.send({ embeds: [embed] });
    },
};
