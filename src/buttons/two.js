export default {
	data: {
		name: 'two',
		description: 'purchase an item',
	},
	async execute(interaction, client) {
		console.log('button pressed')
		interaction.reply('purchase button clicked')
	},
}
