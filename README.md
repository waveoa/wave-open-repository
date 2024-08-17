# Wave Discord Handling Application

Wave is a feature-rich Discord bot built using the `discord.js` library. This bot provides various functionalities including command handling, message logging, and dynamic command reloading. This README will guide you through setting up and using the bot, as well as provide information on the bot's features and commands.

## Features

- **Command Handling**: Responds to various commands with predefined actions.
- **Message Logging**: Logs recent messages from channels on bot startup.
- **Dynamic Command Loading**: Automatically loads and reloads commands from the `commands` directory.
- **Interaction Handling**: Supports slash commands and interactions.
- **Error Handling**: Logs errors and warnings for debugging purposes.
- **Bot Status Updates**: Updates and logs the bot's status periodically.

## Setup

### Prerequisites

- Node.js (version 16.6.0 or higher)
- A Discord bot token (from the Discord Developer Portal)
- Required npm packages

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/wave-discord-bot.git
   cd wave-discord-bot
   ```

2. **Install Dependencies**

   ```bash
   npm install

3. **Create a Configuration File**

   Create a file named `config.json` in the root directory of your project with the following content:

   ```json
   {
     "token": "YOUR_BOT_TOKEN_HERE",
     "clientId": "YOUR_CLIENT_ID_HERE",
     "guildId": "YOUR_GUILD_ID_HERE"
   }
   ```

   Replace `YOUR_BOT_TOKEN_HERE` with your actual bot token, and `YOUR_CLIENT_ID_HERE` and `YOUR_GUILD_ID_HERE` with your Discord application and server IDs, respectively.

### Command Files

Place your command files in the `commands` directory. Each command file should export an object with the following structure:

```javascript
module.exports = {
    data: {
        name: 'commandName', // Command name
        description: 'Command description', // Command description (for slash commands)
    },
    execute(interaction) {
        // Command logic here
    },
};
```

### Running the Bot

Start the bot by running:

```bash
node index.js
```

## Commands

### Prefix Commands

The bot supports a variety of commands with the `!` prefix. Here are some example commands:

- `-ping`: Responds with "Pong!"
- `-info`: Provides information about the message sender and server.
- `-help`: Displays a help message listing all available commands.

### Slash Commands

Commands are also handled via slash commands (e.g., `/ping`). Ensure your bot has the appropriate permissions to register and use slash commands.

## File Structure

- `index.js`: Main bot script that initializes and starts the bot.
- `commands/`: Directory containing command files.
  - `ping.js`: Example command file that handles the `!ping` command.
  - `info.js`: Example command file that handles the `!info` command.
  - Additional command files can be added here.
- `config.json`: Configuration file containing sensitive information (token, client ID, guild ID).

## Error Handling and Logging

The bot logs errors and warnings to the console. Make sure to monitor these logs to ensure the bot is running smoothly.

## Development and Testing

- **Dynamic Command Reloading**: Commands are automatically reloaded when changes are detected in the `commands` directory.
- **Testing Commands**: Test your commands by sending messages or using slash commands in your Discord server.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [discord.js](https://discord.js.org/) - The library used for interacting with the Discord API.
- [Node.js](https://nodejs.org/) - JavaScript runtime used for running the bot.
