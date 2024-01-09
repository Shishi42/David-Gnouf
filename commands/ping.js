const Discord = require("discord.js")

module.exports = {

  name: "ping",
  description: "Show the BOT ping",
  permission: null,
  dm: true,
  category: "Utility",

  async run(bot, message, args) {
    return await message.reply(`BOT ping : \`${Date.now() - message.createdTimestamp}\`, API ping : \`${Math.round(bot.ws.ping)}\``)
  }
}
