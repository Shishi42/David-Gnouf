const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  message.channel.send('<:www:841346022885294140> <:aaa:841346022885294140> <:hhh:841346022885294140>')
  return message.delete()
}

module.exports.config = {
  name: "wah",
  aliases: [],
  args: [],
  usage: ["wah"],
  desc: "Send wah."
}
