const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// We use a free API to fetch random memes
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Get a random meme from Reddit'),
    async execute(interaction) {
        const response = await fetch('https://meme-api.com/gimme');
        const data = await response.json();

        const embed = new EmbedBuilder()
            .setTitle(data.title)
            .setURL(data.postLink)
            .setImage(data.url)
            .setFooter({ text: `Subreddit: ${data.subreddit}` });

        await interaction.reply({ embeds: [embed] });
    },
};
