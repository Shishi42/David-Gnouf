const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  message.channel.send('<:hhh2:841350350668955678><:iii:841350350258438150><:ccc:841350350543126579>')
  return message.delete()
}

module.exports.config = {
  name: "hic",
  aliases: [],
  args: [],
  usage: ["hic"],
  desc: "Send hic."
}
