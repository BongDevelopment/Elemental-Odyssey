module.exports = {
    data: {
      name: "equip",
      description: "equips element",
    },
    async execute(interaction, client) {
      console.log("button pressed");
      interaction.reply('equip button clicked');
    },
  };