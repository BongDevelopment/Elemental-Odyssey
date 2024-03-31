import { fileURLToPath } from 'url'; 

import { readdirSync } from 'fs';
import path from 'path';
import { Collection } from 'discord.js';
import { ChalkAdvanced } from 'chalk-advanced';

export default class ButtonHandler {
    constructor(client) {
        this.client = client;
        this.client.buttons = new Collection();
    }

    // Load the buttons

    async load() {
        const currentFilePath = fileURLToPath(import.meta.url);
        const currentDirectory = path.dirname(currentFilePath);
        const buttonsDirectory = path.join(currentDirectory, '..', 'buttons');

        for (const file of readdirSync(buttonsDirectory).filter((file) => file.endsWith('.js'))) {
            const button = (await import(`file://${path.join(buttonsDirectory, file)}`)).default;
            this.client.buttons.set(button.data.name, button);
        }
        console.log(
            `${ChalkAdvanced.white('Elemental Odyssey')} ${ChalkAdvanced.gray('>')} ${ChalkAdvanced.green('Successfully loaded buttons')}`
        );
    }

    // Reload the buttons

    reload() {
        this.client.buttons = new Collection();
        this.load();
    }
}
