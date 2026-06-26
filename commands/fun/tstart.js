const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tstart')
        .setDescription('Start a timed event')
        .addIntegerOption(option => 
            option.setName('minutes')
            .setDescription('Duration in minutes')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('message')
            .setDescription('The message to display')
            .setRequired(true)),
    async execute(interaction) {
        const minutes = interaction.options.getInteger('minutes');
        const message = interaction.options.getString('message');

        // Calculate the future timestamp (Current time + duration in seconds)
        const endTime = Math.floor(Date.now() / 1000) + (minutes * 60);

        // Build the embed to match the style of 41559.png
        const embed = new EmbedBuilder()
            .setTitle('<a:Timer:1519928783447265432> Timer <a:Timer:1519928783447265432>')
            .setDescription(`**${message}**\n\n<a:Clock:1519928937361178784> Ends : <t:${endTime}:R> ( <t:${endTime}:t> ) <a:Clock:1519928937361178784>`)
            .setFooter({ text: `Timer ends | Today at ${new Date(endTime * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` })
            .setColor('#2b2d31');

        // Post the announcement publicly as a raw bot message
        await interaction.channel.send({ embeds: [embed] });

        // Confirm to the command user privately (ephemeral)
        await interaction.reply({ content: 'Timer started!', ephemeral: true });
    },
};
