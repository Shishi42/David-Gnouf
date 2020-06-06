const Discord = require("discord.js")
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  if(message.author.id != config.bot_owner) return message.channel.send("ptdr t ki")
}

module.exports.config = {
  name: "reload",
  aliases: []

}
