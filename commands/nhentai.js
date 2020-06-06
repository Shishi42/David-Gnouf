const Discord = require("discord.js")
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  if(args[1]){
    message.channel.send('Un seul à la fois. <:kappacr:700442157256802436>')
    return
  }
  
  message.channel.send('https://www.nhentai.net/g/'+ args[0])
}

module.exports.config = {
  name: "nhentai",
  aliases: ["hentai","n"]

}
