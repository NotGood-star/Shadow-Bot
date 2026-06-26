const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tstart')
        .setDescription('Start a timed event (e.g., Giveaway/Falcon)')
        .addStringOption(option => option.setName('duration').setDescription('e.g., 1h, 30m').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('The message to announce').setRequired(true)),
    async execute(interaction) {
        const duration = interaction.options.getString('duration');
        const message = interaction.options.getString('message');

        // 1. Create a clean, anonymous Embed for the public announcement
        const embed = new EmbedBuilder()
            .setTitle('🚀 Event Started!')
            .setDescription(message)
            .addFields({ name: 'Duration', value: duration, inline: true })
            .setColor('#2b2d31')
            .setTimestamp();

        // 2. Post the announcement publicly
        await interaction.channel.send({ embeds: [embed] });

        // 3. Confirm to the user privately (hides who used the command)
        await interaction.reply({ content: 'Event has been started successfully.', ephemeral: true });
    },
};
