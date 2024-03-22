import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

export async function refresh() {

const commands = [];
const foldersPath = path.resolve('./src/commands/');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const folderPath = path.join(foldersPath, folder);
    if (fs.statSync(folderPath).isDirectory()) {
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const fileName = file.slice(0, -3);
            const filePath = path.join(folderPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                const commandData = command.data.toJSON();
                commandData.name = fileName;
                commands.push(commandData);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    } else {
        console.log(`[WARNING] ${folderPath} is not a directory.`);
    }
}



async function refreshCommands() {
    try {
        console.log('Started refreshing application (/) commands.');

        const rest = new REST({ version: '10' }).setToken("MTIwMDYxMDAzODIxNDAzNzYxNg.GwphlJ.ICfQebLto9-hhEsn1RspcZfFyUBgjc1xHVODzc");

        await rest.put(Routes.applicationCommands("1200610038214037616"), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

if (process.argv[2] == "true") {
    refreshCommands();
}

}


