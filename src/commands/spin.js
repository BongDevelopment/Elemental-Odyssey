const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spin")
    .setDescription("Spin to get a random rarity and element"),

  async execute(interaction, client) {
    fs.readFile("./data/elements.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading elements file:", err);
        return;
      }

      try {
        const rarities = JSON.parse(data);

        let cumulativePercentage = 0;
        const totalPercentage = rarities.rarities.reduce((acc, rarity) => acc + rarity.percentage, 0);
        
        const randomNumber = Math.random() * totalPercentage;
        
        let selectedRarity = null;
        
        for (const rarity of rarities.rarities) {
          cumulativePercentage += rarity.percentage;
        
          if (randomNumber <= cumulativePercentage) {
            selectedRarity = rarity;
            break; // Found the rarity, exit the loop
          }
        }
        
        if (!selectedRarity) {
          selectedRarity = rarities.rarities[0];
        }
        const elements = selectedRarity.elements;
        const randomElementIndex = Math.floor(Math.random() * elements.length);
        const elementName = elements[randomElementIndex];


        // Create embed with spin result
        const spinEmbed = new EmbedBuilder()
          .setColor("#808080")
          .setTitle("Element Roller")
          .setDescription(`You rolled:\nRarity: **${selectedRarity.name}**\nElement: **${elementName}**\nseed: ${randomNumber}`);

        // Create action row with buttons
        const actionRow = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setLabel("Skip")
              .setStyle(2)
              .setCustomId("skip")
          )
          .addComponents(
            new ButtonBuilder()
              .setLabel("Equip")
              .setStyle(1)
              .setCustomId("equip")
          );

        interaction.reply({ embeds: [spinEmbed], components: [actionRow] });
      } catch (error) {
        console.error("Error parsing rarities JSON:", error);
      }
    });
  },
};
