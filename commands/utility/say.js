const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot say something.')
        .addStringOption(option => 
            option.setName('message')
            .setDescription('The message to send')
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        const message = interaction.options.getString('message');
        
        // Bot sends the message directly
        await interaction.reply({ content: 'Message sent!', ephemeral: true });
        await interaction.channel.send(message);
    },
};
