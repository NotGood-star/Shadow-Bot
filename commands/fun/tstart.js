const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tstart')
        .setDescription('Start a timed event')
        .addIntegerOption(option => option.setName('minutes').setDescription('Duration in minutes').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('The message').setRequired(true)),
    async execute(interaction) {
        const minutes = interaction.options.getInteger('minutes');
        const messageText = interaction.options.getString('message');
        const endTime = Math.floor(Date.now() / 1000) + (minutes * 60);

        // Initial Embed (Running)
        const embed = new EmbedBuilder()
            .setTitle('<a:Timer:1519928783447265432> Timer <a:Timer:1519928783447265432>')
            .setDescription(`**${messageText}**\n\n<a:Clock:1519928937361178784> Ends : <t:${endTime}:R>`)
            .setColor('#00b0f4') // Blue side color
            .setFooter({ text: `Timer started | ${new Date().toLocaleTimeString()}` });

        const msg = await interaction.channel.send({ embeds: [embed] });
        await interaction.reply({ content: 'Timer started!', ephemeral: true });

        // Wait for the duration, then edit the message
        setTimeout(async () => {
            const endedEmbed = new EmbedBuilder()
                .setTitle('<a:Alarm:1519929999999999999> Timer Ended <a:Alarm:1519929999999999999>')
                .setDescription(`**${messageText}**\n\n⏰ Timer ended at <t:${endTime}:t> ⏰`)
                .setColor('#00b0f4') // Consistent blue side color
                .setFooter({ text: `Timer Ended | ${new Date().toLocaleTimeString()}` });

            await msg.edit({ embeds: [endedEmbed] });
        }, minutes * 60 * 1000);
    },
};
