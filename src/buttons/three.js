module.exports = {
    data: {
      name: "three",
      description: "purchase an item",
    },
    async execute(interaction, client) {
      console.log("button pressed");
      interaction.reply('purchase button clicked');
    },
  };