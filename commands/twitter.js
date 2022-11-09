const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  message.channel.send('https://twitter.com/'+ args[0])
}

module.exports.config = {
  name: "twitter",
  aliases: ["tw","t"],
  args: ["<end_of_link>"],
  usage: ["twitter <end_of_link>"],
  desc: "Send beautified twitter link."
}
