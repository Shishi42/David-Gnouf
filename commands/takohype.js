const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  message.channel.send('<:rightglow:841350350580482048><:pat:841350350534475807><:leftglow:841350350493450290>')
  return message.delete()
}

module.exports.config = {
  name: "takohype",
  aliases: ["tako"],
  args: [],
  usage: ["takohype"],
  desc: "Send tako hype."
}
