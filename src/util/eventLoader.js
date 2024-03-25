import { readdir } from 'fs'
import { ChalkAdvanced } from 'chalk-advanced'

export default class EventHandler {
	constructor(client) {
		this.client = client
	}

	load() {
		readdir('./src/events/', async (err, files) => {
			if (err) return console.error(err)

			for (let file of files) {
				console.log(
					`${ChalkAdvanced.white('Elemental Odyssey')} ${ChalkAdvanced.gray(
						'>'
					)} ${ChalkAdvanced.green(
						`Loaded event: ${ChalkAdvanced.white(file)}`
					)}`
				)
				const event = (await import('../events/' + file)).default
				let eventName = file.split('.')[0]

				this.client.on(eventName, event.bind(null, this.client))
			}
		})
	}
}
