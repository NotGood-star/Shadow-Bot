const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('funfact')
        .setDescription('Get a random fun fact!')
        .addStringOption(option => 
            option.setName('category')
            .setDescription('Choose a topic')
            .setRequired(true)
            .addChoices(
                { name: 'Roblox', value: 'roblox' },
                { name: 'Minecraft', value: 'minecraft' },
                { name: 'General', value: 'general' }
            )),
    async execute(interaction) {
        const category = interaction.options.getString('category');
        
        const facts = {
            roblox: [
                "Roblox was originally called 'Dynablocks' during its development in 2004.",
                "The 'Oof' sound effect was actually taken from a different game called Messiah.",
                "Roblox has over 40 million games available on the platform."
            ],
            minecraft: [
                "The 'Creeper' was created due to a coding error when trying to model a pig.",
                "Endermen speak English; if you listen closely and reverse their audio, they are saying 'Hey', 'What's up', and 'Look for the eye'.",
                "Minecraft was originally called 'Cave Game'."
            ],
            general: [
                "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.",
                "Bananas are technically berries, but strawberries are not."
            ]
        };

        const categoryFacts = facts[category];
        const randomFact = categoryFacts[Math.floor(Math.random() * categoryFacts.length)];

        const embed = new EmbedBuilder()
            .setTitle(`🎮 ${category.charAt(0).toUpperCase() + category.slice(1)} Fun Fact`)
            .setDescription(randomFact)
            .setColor('#5865F2');

        await interaction.reply({ embeds: [embed] });
    },
};
