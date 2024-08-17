const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverstats')
    .setDescription('Displays statistics about the server.')
    .addBooleanOption(option =>
      option.setName('detailed')
        .setDescription('Show detailed server statistics.')
    ),
  
  async execute(interaction) {
    const detailed = interaction.options.getBoolean('detailed');

    const server = interaction.guild;
    const totalMembers = server.memberCount;
    const onlineMembers = server.members.cache.filter(m => m.presence?.status === 'online').size;
    const totalChannels = server.channels.cache.size;
    const textChannels = server.channels.cache.filter(c => c.type === 'GUILD_TEXT').size;
    const voiceChannels = server.channels.cache.filter(c => c.type === 'GUILD_VOICE').size;
    const totalRoles = server.roles.cache.size;

    const embed = new MessageEmbed()
      .setTitle(`${server.name} Server Statistics`)
      .setThumbnail(server.iconURL())
      .addField('Total Members', `${totalMembers}`, true)
      .addField('Online Members', `${onlineMembers}`, true)
      .addField('Total Channels', `${totalChannels}`, true)
      .addField('Text Channels', `${textChannels}`, true)
      .addField('Voice Channels', `${voiceChannels}`, true)
      .addField('Total Roles', `${totalRoles}`, true)
      .setColor('BLUE')
      .setTimestamp();

    if (detailed) {
      const roleDetails = server.roles.cache.map(role => `${role.name} - ${role.members.size} members`).join('\n');
      embed.addField('Role Details', roleDetails || 'No roles available.');
    }

    await interaction.reply({ embeds: [embed] });
  }
};