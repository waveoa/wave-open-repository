const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll with multiple options.')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('The question to be asked in the poll.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('option1')
        .setDescription('First poll option.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('option2')
        .setDescription('Second poll option.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('option3')
        .setDescription('Third poll option (optional).')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('option4')
        .setDescription('Fourth poll option (optional).')
        .setRequired(false)
    ),
  
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = [
      interaction.options.getString('option1'),
      interaction.options.getString('option2'),
      interaction.options.getString('option3'),
      interaction.options.getString('option4')
    ].filter(option => option !== null);

    const pollEmbed = new MessageEmbed()
      .setTitle('📊 New Poll!')
      .setDescription(question)
      .setColor('GREEN')
      .setTimestamp();

    options.forEach((option, index) => {
      pollEmbed.addField(`Option ${index + 1}`, option, true);
    });

    const pollMessage = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });

    const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣'];
    for (let i = 0; i < options.length; i++) {
      await pollMessage.react(reactions[i]);
    }
  }
};
