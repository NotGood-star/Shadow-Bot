const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../embedHelper');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get a user\'s avatar.')
        .addUserOption(option => option.setName('user').setDescription('The user to get the avatar from')),
    async execute(interaction) {
        // Fallback to the command user if no one is mentioned
        const user = interaction.options.getUser('user') || interaction.user;
        
        const embed = createEmbed(`${user.username}'s Avatar`, '')
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }));
            
        await interaction.reply({ embeds: [embed] });
    },
};
