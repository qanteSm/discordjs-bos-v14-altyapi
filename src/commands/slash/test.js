const {
  EmbedBuilder,
  PermissionsBitField,
  PermissionFlagsBits,
  AttachmentBuilder,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test için komut")
    .setDMPermission(true),
  run: async (client, interaction) => {
    interaction.reply("Qante SM!");
  }
};
