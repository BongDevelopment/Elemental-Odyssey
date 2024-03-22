import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { Sern, single, makeDependencies } from '@sern/handler';
import { refresh } from './refresh.js';



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
        commands: 'src/commands',
        // events: 'src/events', //(optional)
    });
}


init().then(() => {
    
    client.login("MTIwMDYxMDAzODIxNDAzNzYxNg.GwphlJ.ICfQebLto9-hhEsn1RspcZfFyUBgjc1xHVODzc");

});
