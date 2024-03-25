const {
	SlashCommandBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require('discord.js')
const fs = require('fs').promises
// Note to anyone seeing this, we'll be changing this to a daily shop.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('View items available for purchase'),

	async execute(interaction, client) {
		try {
			const data = await fs.readFile('./data/shop.json', 'utf8')
			const shopData = JSON.parse(data)

			const shopItems = shopData.shop

			if (!Array.isArray(shopItems)) {
				throw new Error('Shop data is not in the correct format')
			}

			const index = interaction.options.getInteger('index') || 0
			const end = Math.min(index + 3, shopItems.length)

			const shopEmbed = new EmbedBuilder()
				.setColor('#00ff00')
				.setTitle('Shop')
				.setDescription(
					'Welcome to the shop! Browse items available for purchase:'
				)

			for (let i = index; i < end; i++) {
				const item = shopItems[i]
				shopEmbed.addFields({
					name: `Item: ${item.item}`,
					value: `Price: ${item.price} Obol ◈`,
					inline: true,
				})
			}

			const actionRow = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setLabel('1')
					.setStyle(2)
					.setCustomId('one'),
				new ButtonBuilder()
					.setLabel('2')
					.setStyle(2)
					.setCustomId('two'),
				new ButtonBuilder()
					.setLabel('3')
					.setStyle(2)
					.setCustomId('three'),
				new ButtonBuilder()
					.setEmoji('➡️')
					.setStyle(1)
					.setCustomId('nextPage')
			)

			await interaction.reply({
				embeds: [shopEmbed],
				components: [actionRow],
			})
		} catch (error) {
			console.error('Error reading shop data:', error)
			await interaction.reply(
				'An error occurred while fetching shop data. Please try again later.'
			)
		}
	},
}
