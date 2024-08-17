// commands/ping.js
const { MessageEmbed } = require('discord.js');

/**
 * Responds with "Pong!" and measures latency.
 * @param {Message} message - The Discord message object.
 * @param {string[]} args - Command arguments.
 */
module.exports = {
    name: 'ping',
    cooldown: 5,
    async execute(message, args) {
        const sentMessage = await message.reply('Pong!');
        const latency = sentMessage.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Pong!')
            .addField('Bot Latency', `${latency}ms`, true)
            .addField('API Latency', `${apiLatency}ms`, true)
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
};
