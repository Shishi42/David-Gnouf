const Discord = require("discord.js")
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  if(args.length != 0){
    message.channel.send(args.join(' '))
  }
  message.delete()
}

module.exports.config = {
  name: "say",
  aliases: ["echo","tell"]

}
