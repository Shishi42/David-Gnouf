const Discord = require("discord.js")

module.exports = {

  name: "ping",
  description: "Show the BOT ping",
  permission: null,
  dm: true,
  category: "Utility",

  async run(bot, message, args) {
    let ping = Date.now() - message.createdTimestamp
    await message.reply(`BOT ping : \`${ping}\`, API ping : \`${Math.round(bot.ws.ping)}\``)
  }
}
