// index.js
const { Client, Intents, Collection } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_CONTENT] });

// Initialize collections
client.commands = new Collection();
client.cooldowns = new Collection();
client.autoModCache = new Map();

// Load commands
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Load event handlers
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

// Error handling
process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);
});

// Log in to Discord
client.login(process.env.BOT_TOKEN);

console.log('Bot is starting...');