const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  message.channel.send('https://www.google.fr/search?q='+ args.join('+'))
  return message.delete()
}

module.exports.config = {
  name: "google",
  aliases: ["google","gg","search"],
  args: ["<search>"],
  usage: ["google <search>"],
  desc: "Send google link with your search."
}
