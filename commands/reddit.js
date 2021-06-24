const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  message.channel.send('https://redd.it/'+ args[0].split('/')[6])
  return message.delete()
}

module.exports.config = {
  name: "reddit",
  aliases: ["r","short","sr"],
  args: ["<link>"],
  usage: ["reddit <link>"],
  desc: "Shorten reddit input link and send result."
}
