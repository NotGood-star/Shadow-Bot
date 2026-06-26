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
        const messageText = interaction.options.getString('message');
        
        // Define the target end time
        const endTime = Math.floor(Date.now() / 1000) + (minutes * 60);

        // Define your emojis (Ensure these IDs are correct for your server)
        const timerEmoji = '<a:Timer:1519928783447265432>';
        const clockEmoji = '<a:Clock:1519928937361178784>';

        // Initial "Running" Embed
        const embed = new EmbedBuilder()
            .setTitle(`${timerEmoji} Timer ${timerEmoji}`)
            .setDescription(`**${messageText}**\n\n${clockEmoji} Ends : <t:${endTime}:R>`)
            .setColor('#00b0f4')
            .setFooter({ text: `Timer started | ${new Date().toLocaleTimeString()}` });

        const msg = await interaction.channel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Timer started!', ephemeral: true });

        // Logic to update the message when time ends
        setTimeout(async () => {
            try {
                const endedEmbed = new EmbedBuilder()
                    .setTitle(`${timerEmoji} Timer Ended ${timerEmoji}`)
                    .setDescription(`**${messageText}**\n\n⏰ Timer ended at <t:${endTime}:t> ⏰`)
                    .setColor('#00b0f4')
                    .setFooter({ text: `Timer Ended | ${new Date().toLocaleTimeString()}` });

                await msg.edit({ embeds: [endedEmbed] });
            } catch (err) {
                console.error('Failed to edit timer message:', err);
            }
        }, minutes * 60 * 1000);
    },
};
