// events/ready.js
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity('Supporting other bots', { type: 'WATCHING' });

        // Send a startup message to a specific channel
        const channel = client.channels.cache.get(process.env.STARTUP_CHANNEL_ID);
        if (channel) {
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Bot Started')
                .setDescription('The bot has successfully started!')
                .setTimestamp();

            channel.send({ embeds: [embed] });
        } else {
            console.warn('Startup channel not found.');
        }
    }
};