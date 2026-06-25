const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../embedHelper');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Shows info about the server'),
    async execute(interaction) {
        const { guild } = interaction;
        const embed = createEmbed(`Server: ${guild.name}`, `**Owner:** <@${guild.ownerId}>\n**Members:** ${guild.memberCount}\n**Created:** <t:${Math.floor(guild.createdTimestamp / 1000)}:R>`)
            .setThumbnail(guild.iconURL());
        await interaction.reply({ embeds: [embed] });
    },
};
