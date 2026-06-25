const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../embedHelper');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get a user\'s avatar')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('The user to get the avatar from')),
    async execute(interaction) {
        // Use 'target' as the option name, and fall back to interaction.user
        const user = interaction.options.getUser('target') || interaction.user;
        
        // Ensure we have a valid user object before calling displayAvatarURL
        if (!user) {
            return interaction.reply({ content: 'Could not find that user!', ephemeral: true });
        }

        const embed = createEmbed(`${user.username}'s Avatar`, '')
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }));
            
        await interaction.reply({ embeds: [embed] });
    },
};
