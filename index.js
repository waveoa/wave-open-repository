// Import the required modules
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('./config.json');

// Create a new Discord client instance with specific intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageContent,
    ]
});

// Command collection to hold command handlers
client.commands = new Collection();

// Load commands dynamically from the 'commands' directory
const commandsDir = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

// Register commands with the client
for (const file of commandFiles) {
    const filePath = path.join(commandsDir, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

// Event listener for when the bot becomes ready
client.once('ready', () => {
    console.log(`Bot is online as ${client.user.tag}`);
    console.log('Fetching all guilds and their channels...');

    client.guilds.cache.forEach(async (guild) => {
        try {
            console.log(`Processing guild: ${guild.name} (ID: ${guild.id})`);
            const channels = await guild.channels.fetch();
            console.log(`Found ${channels.size} channels in guild ${guild.name}`);

            channels.forEach(async (channel) => {
                if (channel.isTextBased()) {
                    try {
                        const messages = await channel.messages.fetch({ limit: 5 });
                        console.log(`Recent messages in ${channel.name}:`);
                        messages.forEach(message => {
                            console.log(`[${message.author.tag}]: ${message.content}`);
                        });
                    } catch (error) {
                        console.error(`Failed to fetch messages in channel ${channel.name}: ${error.message}`);
                    }
                }
            });
        } catch (error) {
            console.error(`Failed to process guild ${guild.name}: ${error.message}`);
        }
    });
});

// Event listener for incoming messages
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    const commandPrefix = '!';
    if (message.content.startsWith(commandPrefix)) {
        const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        switch (command) {
            case 'ping':
                await message.reply('Pong!');
                break;
            case 'info':
                await message.reply(`This message was sent by ${message.author.tag} in ${message.guild.name}.`);
                break;
            case 'help':
                const helpText = `
**Wave Bot Commands:**
- \`!ping\`: Responds with "Pong!"
- \`!info\`: Provides information about the message
- \`!help\`: Shows this help message
                `;
                await message.reply(helpText);
                break;
            default:
                await message.reply(`Unknown command: ${command}`);
                break;
        }
    }
});

// Event listener for handling interactions like slash commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        await interaction.reply({ content: 'Command not found!', ephemeral: true });
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Error executing command:', error);
        await interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
    }
});

// Event listener for client errors
client.on('error', (error) => {
    console.error('Client encountered an error:', error);
});

// Log the bot in using the token from config.json
client.login(token);