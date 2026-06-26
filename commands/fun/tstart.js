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
        
        // Calculate the exact Unix timestamp for when the timer should end
        const endTime = Math.floor(Date.now() / 1000) + (minutes * 60);

        // Your specific animated emojis
        const clockAnim = '<a:Clock:1519928937361178784>';
        const timerAnim = '<a:Timer:1519928783447265432>';

        // 1. Initial Embed (Timer Running)
        const embed = new EmbedBuilder()
            .setTitle(`${timerAnim} Timer ${timerAnim}`)
            .setDescription(`**${messageText}**\n\n${clockAnim} Ends : <t:${endTime}:R>`)
            .setColor('#00b0f4') // Blue side color
            .setFooter({ text: `Timer started | ${new Date().toLocaleTimeString()}` });

        const msg = await interaction.channel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Timer started!', ephemeral: true });

        // 2. Logic to wait until the EXACT moment the timer ends
        // We use (minutes * 60 * 1000) to get the correct millisecond delay
        setTimeout(async () => {
            try {
                const endedEmbed = new EmbedBuilder()
                    .setTitle(`${timerAnim} Timer Ended ${timerAnim}`)
                    .setDescription(`**${messageText}**\n\n${clockAnim} Timer ended at <t:${endTime}:t> ${clockAnim}`)
                    .setColor('#00b0f4') // Consistent blue side color
                    .setFooter({ text: `Timer Ended` });

                await msg.edit({ embeds: [endedEmbed] });
            } catch (err) {
                console.error('Error editing timer message:', err);
            }
        }, minutes * 60 * 1000); 
    },
};
