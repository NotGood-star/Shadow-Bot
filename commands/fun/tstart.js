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
        
        // Target end time
        const endTime = Math.floor(Date.now() / 1000) + (minutes * 60);

        // Animated Emojis (Ensure these IDs are valid for your server)
        const clockAnim = '<a:Clock:1519928937361178784>'; 
        const timerAnim = '<a:Timer:1519928783447265432>';

        // Initial Embed (Timer Running)
        const embed = new EmbedBuilder()
            .setTitle(`${timerAnim} Timer ${timerAnim}`)
            .setDescription(`**${messageText}**\n\n${clockAnim} Ends : <t:${endTime}:R> ( <t:${endTime}:t> ) ${clockAnim}`)
            .setColor('#00b0f4') // Blue side color
            .setFooter({ text: `Timer started | ${new Date().toLocaleTimeString()}` });

        const msg = await interaction.channel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Timer started!', ephemeral: true });

        // Timer to swap to "Ended" state
        setTimeout(async () => {
            try {
                const endedEmbed = new EmbedBuilder()
                    .setTitle(`${timerAnim} Timer Ended ${timerAnim}`)
                    .setDescription(`**${messageText}**\n\n${clockAnim} Timer ended at <t:${endTime}:t> ${clockAnim}`)
                    .setColor('#00b0f4') // Consistent blue side color
                    .setFooter({ text: `Timer Ended | ${new Date().toLocaleTimeString()}` });

                await msg.edit({ embeds: [endedEmbed] });
            } catch (err) {
                console.error('Error editing timer message:', err);
            }
        }, minutes * 60 * 1000);
    },
};
