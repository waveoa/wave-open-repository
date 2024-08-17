// events/messageCreate.js
const { autoMod } = require('../utils/automod');
const { isUserAuthorized } = require('../utils/authorization');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        // Auto moderation
        if (autoMod(message)) {
            console.log(`Message from ${message.author.tag} was moderated.`);
            return;
        }

        // Command handling
        const prefix = '!';
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        // Command cooldowns
        if (!client.cooldowns.has(commandName)) {
            client.cooldowns.set(commandName, new Collection());
        }

        const now = Date.now();
        const timestamps = client.cooldowns.get(commandName);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more seconds before reusing the \`${commandName}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error('Error executing command:', error);
            await message.reply('There was an error executing that command!');
        }
    }
};