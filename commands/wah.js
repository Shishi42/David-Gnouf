const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  message.channel.send(':www::aaa::hhh:')
  return message.delete()
}

module.exports.config = {
  name: "wah",
  aliases: [],
  args: [],
  usage: ["wah"],
  desc: "Send wah."
}
