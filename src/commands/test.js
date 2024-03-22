const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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

        const randomNumber = Math.random() * 100;
        let selectedRarity = null;

        for (const rarity of rarities.rarities) {
          if (randomNumber <= rarity.percentage) {
            selectedRarity = rarity;
            break;
          }
        }

        if (!selectedRarity) {
          selectedRarity = rarities.rarities[0]; // Common
        }

        const elements = selectedRarity.elements;
        const randomElementIndex = Math.floor(Math.random() * elements.length);
        const elementName = elements[randomElementIndex];

        const spinEmbed = new EmbedBuilder()
          .setColor("#808080")
          .setTitle("Element Roller")
          .setDescription(`You rolled:\nRarity: **${selectedRarity.name}**\nElement: **${elementName}**`);

        interaction.reply({ embeds: [spinEmbed] });
      } catch (error) {
        console.error("Error parsing rarities JSON:", error);
      }
    });
  },
};
