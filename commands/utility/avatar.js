const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get a user\'s avatar')
        .addUserOption(option => 
            option.setName('target')
            .setDescription('The user to get the avatar from')),
    async execute(interaction) {
        try {
            // Get the user from the option, or fallback to the command sender
            const user = interaction.options.getUser('target') || interaction.user;
            
            // Create the embed directly here to avoid pathing issues with embedHelper
            const embed = new EmbedBuilder()
                .setTitle(`${user.username}'s Avatar`)
                .setColor('#5865F2')
                .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }));
                
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('AVATAR ERROR:', error);
            await interaction.reply({ content: 'I could not fetch that avatar!', ephemeral: true });
        }
    },
};
