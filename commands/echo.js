// commands/echo.js
const { MessageEmbed } = require('discord.js');

/**
 * Echoes back the user's message.
 * @param {Message} message - The Discord message object.
 * @param {string[]} args - Command arguments.
 */
module.exports = {
    name: 'echo',
    cooldown: 5,
    async execute(message, args) {
        if (!args.length) {
            return message.reply('You need to provide a message to echo!');
        }

        const text = args.join(' ');

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Echo')
            .setDescription(text)
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
};

