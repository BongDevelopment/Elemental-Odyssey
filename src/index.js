import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { Sern, single, makeDependencies } from '@sern/handler';
import * as fs from 'fs/promises';
import * as path from 'path';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // Make sure this is enabled for text commands!
    ],
});

async function init() {
    await makeDependencies(({ add }) => {
        add('@sern/client', single(() => client));
    });

    Sern.init({
        defaultPrefix: '!', // removing defaultPrefix will shut down text commands
        commands: 'src/commands'
        // events: 'src/events', //(optional)
    });
}

async function refreshCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        const commands = await getCommands();

        const rest = new REST({ version: '10' }).setToken("MTIwMDYxMDAzODIxNDAzNzYxNg.GwphlJ.ICfQebLto9-hhEsn1RspcZfFyUBgjc1xHVODzc");

        await rest.put(Routes.applicationCommands("1200610038214037616"), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

async function getCommands() {
    const commandsDir = './src/commands/';
    const commandFiles = await fs.readdir(commandsDir);

    const commands = commandFiles.map(async (file) => {
        const commandPath = path.join(commandsDir, file);
        const { default: command } = await import(commandPath);
        return command;
    });

    return Promise.all(commands);
}

init().then(() => {
    refreshCommands();
    client.login("MTIwMDYxMDAzODIxNDAzNzYxNg.GwphlJ.ICfQebLto9-hhEsn1RspcZfFyUBgjc1xHVODzc");
});
