const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a random meme from Reddit'),
    async execute(interaction) {
        // 1. Tell Discord you are working on it so it doesn't time out
        await interaction.deferReply();

        try {
            // 2. Fetch the meme
            const response = await fetch('https://meme-api.com/gimme');
            const data = await response.json();

            // 3. Create the embed
            const embed = new EmbedBuilder()
                .setTitle(data.title)
                .setURL(data.postLink)
                .setImage(data.url)
                .setFooter({ text: `Subreddit: ${data.subreddit}` })
                .setColor('#FF5733');

            // 4. Edit the deferred reply with the actual result
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('MEME ERROR:', error);
            await interaction.editReply({ content: 'I had trouble finding a meme!' });
        }
    },
};
