const Discord = require("discord.js")
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

  message.channel.send("Pinging...").then(m => {
    let ping = m.createdTimestamp - message.createdTimestamp
    m.edit(`Ping du BOT : ${ping}, ping de l'API : ${Math.round(bot.ping)}`)
  })
}

module.exports.config = {
  name: "ping",
  aliases: []

}
