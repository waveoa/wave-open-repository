// commands/uptime.js
const { MessageEmbed } = require('discord.js');

/**
 * Responds with the bot's uptime.
 * @param {Message} message - The Discord message object.
 * @param {string[]} args - Command arguments.
 */
module.exports = {
    name: 'uptime',
    cooldown: 5,
    async execute(message, args) {
        const uptime = process.uptime();
        const days = Math.floor(uptime / (3600 * 24));
        const hours = Math.floor((uptime % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Uptime')
            .setDescription(`I've been up for ${days}d ${hours}h ${minutes}m ${seconds}s.`)
            .setTimestamp();

        await message.reply({ embeds
