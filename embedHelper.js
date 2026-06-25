const { EmbedBuilder } = require('discord.js');

const createEmbed = (title, description) => {
    return new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor('#5865F2') // Blurple
        .setTimestamp()
        .setFooter({ text: 'Shadow Bot Official' });
};

module.exports = { createEmbed };
