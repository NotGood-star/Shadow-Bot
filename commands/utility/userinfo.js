const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../embedHelper');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Shows info about a user')
        .addUserOption(option => option.setName('user').setDescription('The user to check')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        const embed = createEmbed(`User Info: ${user.username}`, `**ID:** ${user.id}\n**Joined Server:** <t:${Math.floor(member.joinedTimestamp / 1000)}:R>\n**Account Created:** <t:${Math.floor(user.createdTimestamp / 1000)}:R>`)
            .setThumbnail(user.displayAvatarURL());
        await interaction.reply({ embeds: [embed] });
    },
};
