const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  message.channel.send('<:www:841344525003915286><:aaa:841344525070893056><:hhh:841344525112442900>')
  return message.delete()
}

module.exports.config = {
  name: "wah",
  aliases: [],
  args: [],
  usage: ["wah"],
  desc: "Send wah."
}
