module.exports = {
    data: {
      name: "one",
      description: "purchase an item",
    },
    async execute(interaction, client) {
      console.log("button pressed");
      interaction.reply('purchase button clicked');
    },
  };