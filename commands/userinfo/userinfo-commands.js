const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Displays information about a user.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to get information about.')
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const targetUser = interaction.options.getUser('target');
    const member = await interaction.guild.members.fetch(targetUser.id);

    const embed = new MessageEmbed()
      .setTitle(`User Info: ${targetUser.username}`)
      .setThumbnail(targetUser.displayAvatarURL())
      .addField('Username', `${targetUser.tag}`, true)
      .addField('User ID', `${targetUser.id}`, true)
      .addField('Joined Server', `${member.joinedAt.toDateString()}`, true)
      .addField('Account Created', `${targetUser.createdAt.toDateString()}`, true)
      .addField('Roles', `${member.roles.cache.map(role => role.name).join(', ') || 'None'}`, true)
      .setColor('ORANGE')
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};