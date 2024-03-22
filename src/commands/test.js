const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	SlashCommandBuilder,
  } = require("discord.js");
  
  module.exports = {
	data: new SlashCommandBuilder()
	  .setName("test")
	  .setDescription("test"),
  
	async execute(interaction, client) {
	  const pingembed = new EmbedBuilder()
  
		.setColor("#5865f4")
		.setTitle("poop")
		.addFields({
		  name: "nuck figgers",
		  value: `123`,
		  inline: false,
		})
		.setTimestamp();
  
	  const button = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
		  .setLabel("status")
		  .setStyle(5)
		  .setURL("https://discordstatus.com/"),
		  new ButtonBuilder()
		  .setLabel("Test")
		  .setCustomId("test") // this needs to match the data inside the button file
		  .setStyle(1)
		  .setEmoji("⚠️")
	  );
  
	  await interaction.reply({
		embeds: [pingembed],
		components: [button],
	  });
	},
  };