const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

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
        
        // Duration in milliseconds (minutes * 60 seconds * 1000 ms)
        const durationInMs = minutes * 60 * 1000;
        
        // Calculate the exact Unix timestamp for the end time
        const endTime = Math.floor(Date.now() / 1000) + (minutes * 60);

        // --- ANIMATED EMOJI STRINGS ---
        // These MUST be the exact strings from your server (typed \:EmojiName: in Discord)
        const timerAnim = '<a:Timer:1519928783447265432>'; 
        const clockAnim = '<a:Clock:1519928937361178784>';
        // ------------------------------

        // 1. Initial Embed (Timer Running)
        const embed = new EmbedBuilder()
            .setTitle(`${timerAnim} Timer ${timerAnim}`)
            .setDescription(`**${messageText}**\n\n${clockAnim} Ends : <t:${endTime}:R>`)
            .setColor('#00b0f4')
            .setFooter({ text: `Timer started | ${new Date().toLocaleTimeString()}` });

        // Post the message
        const msg = await interaction.channel.send({ embeds: [embed] });
        
        // Respond ephemerally to the user
        await interaction.reply({ 
            content: 'Timer started!', 
            flags: MessageFlags.Ephemeral 
        });

        // 2. Logic to wait until the exact moment the timer expires
        setTimeout(async () => {
            try {
                // Update the embed to the "Ended" state
                const endedEmbed = new EmbedBuilder()
                    .setTitle(`${timerAnim} Timer Ended ${timerAnim}`)
                    .setDescription(`**${messageText}**\n\n${clockAnim} Timer ended at <t:${endTime}:t> ${clockAnim}`)
                    .setColor('#00b0f4')
                    .setFooter({ text: `Timer Ended` });

                await msg.edit({ embeds: [endedEmbed] });
            } catch (err) {
                console.error('Failed to update timer message:', err);
            }
        }, durationInMs);
    },
};
