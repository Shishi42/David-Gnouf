const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  message.channel.send("Pinging...").then(m => {
    let ping = m.createdTimestamp - message.createdTimestamp
    m.edit(`BOT ping : ${ping}, API ping : ${Math.round(bot.ws.ping)}`)
  })
}

module.exports.config = {
  name: "ping",
  aliases: ["pg"],
  args: [],
  usage: ["ping"],
  desc: "Send bot and API ping in a message."
}
