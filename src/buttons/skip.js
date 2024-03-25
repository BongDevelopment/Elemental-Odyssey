module.exports = {
	data: {
		name: 'skip',
		description: 'skips element',
	},
	async execute(interaction, client) {
		console.log('button pressed')
		interaction.reply('Skip button clicked')
	},
}
