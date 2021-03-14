const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  function duration(ms){
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24))).toString()

    return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`
  }

  message.channel.send(`Online since ${duration(bot.uptime)}`)
}

module.exports.config = {
  name: "uptime",
  aliases: ["upt","up","ut"],
  args: [],
  usage: ["uptime"],
  desc: "Send since when the bot is up in a message."
}
