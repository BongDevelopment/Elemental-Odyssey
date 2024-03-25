export default {
	data: {
		name: 'nextPage',
		description: 'moves page',
	},
	async execute(interaction, client) {
		console.log('button pressed')
		interaction.reply('page button clicked')
	},
}
