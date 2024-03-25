import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { readdirSync } from 'fs'
;(await import('dotenv')).config()
import { ChalkAdvanced } from 'chalk-advanced'

export default async function (client) {
	const commandFiles = readdirSync('./src/commands/').filter((file) =>
		file.endsWith('.js')
	)

	const commands = []

	for (const file of commandFiles) {
		const command = (await import(`../commands/${file}`)).default
		commands.push(command.data.toJSON())
		client.commands.set(command.data.name, command)
	}

	const rest = new REST({
		version: '10',
	}).setToken(process.env.TOKEN)

	;(async () => {
		try {
			if (process.env.STATUS === 'PRODUCTION') {
				await rest.put(Routes.applicationCommands(client.user.id), {
					body: commands,
				})
				console.log(
					`${ChalkAdvanced.white('Elemental Odyssey')} ${ChalkAdvanced.gray(
						'>'
					)} ${ChalkAdvanced.green(
						'Successfully registered commands globally'
					)}`
				)
			} else {
				await rest.put(
					Routes.applicationGuildCommands(
						client.user.id,
						process.env.GUILD_ID
					),
					{
						body: commands,
					}
				)

				console.log(
					`${ChalkAdvanced.white('Elemental Odyssey')} ${ChalkAdvanced.gray(
						'>'
					)} ${ChalkAdvanced.green(
						'Successfully registered commands locally'
					)}`
				)
			}
		} catch (err) {
			if (err) console.error(err)
		}
	})()
	client.user.setPresence({
		activities: [{ name: process.env.STATUSBOT }],
		status: process.env.DISCORDSTATUS,
	})
}
