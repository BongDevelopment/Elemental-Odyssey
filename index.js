import BoilerplateClient from './src/util/client.js'
import ChalkAdvanced from 'chalk-advanced'

const client = new BoilerplateClient()

client.loginBot().then(() => {
	console.log(
		`${ChalkAdvanced.white('Elemental Odyssey')} ${ChalkAdvanced.gray(
			'>'
		)} ${ChalkAdvanced.green('Bot sucessfully started. ')}`
	)
})
