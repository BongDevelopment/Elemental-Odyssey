// Main Bot Library's
import { Client, GatewayIntentBits, Options, Collection } from 'discord.js'
;(await import('dotenv')).config()

import EventHandler from './eventLoader.js'
import ButtonHandler from './buttonHandler.js'

export default class BoilerplateClient extends Client {
	constructor(customCacheOptions = {}) {
		super({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
			],
			makeCache: Options.cacheWithLimits({
				BaseGuildEmojiManager: 0,
				GuildBanManager: 0,
				GuildInviteManager: 0,
				GuildStickerManager: 0,
				PresenceManager: 0,
				ThreadManager: 0,
				ThreadMemberManager: 0,
				CategoryChannelChildManager: 0,
				MessageManager: 0,
				ReactionManager: 0,
				...customCacheOptions,
			}),
		})

		this.commands = new Collection()

		// Event Loader
		this.eventHandler = new EventHandler(this)
		this.eventHandler.load()

		// Button Loader
		this.buttonHandler = new ButtonHandler(this)
		this.buttonHandler.load()
	}

	loginBot() {
		return this.login(process.env.TOKEN)
	}
}
