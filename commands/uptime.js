const Discord = require("discord.js")

module.exports = {

  name: "uptime",
  description: "Show BOT uptime",
  permission: null,
  dm: true,
  category: "Utility",

  async run(bot, message, args) {

    function duration(ms){
     const sec = Math.floor((ms / 1000) % 60).toString()
     const min = Math.floor((ms / (1000 * 60)) % 60).toString()
     const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString()
     const days = Math.floor((ms / (1000 * 60 * 60 * 24))).toString()

     return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`
    }

  	await message.reply(`Online since \`${duration(bot.uptime)}\``)
  }
}
