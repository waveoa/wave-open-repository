// commands/help.js
const { MessageEmbed } = require('discord.js');

/**
 * Lists all available commands.
 * @param {Message} message - The Discord message object.
 * @param {string[]} args - Command arguments.
 */
module.exports = {
    name: 'help',
    cooldown: 5,
    async execute(message, args) {
        const commands = message.client.commands.map(cmd => {
            return `**!${cmd.name}**: ${cmd.description || 'No description available'}`;
        }).join('\n');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Available Commands')
            .setDescription(commands)
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
};
