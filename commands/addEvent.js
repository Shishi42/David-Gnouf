const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
  args_str = args.slice(1).join(" ")
  message.channel.send("Adding event : **"+args_str+"**, at the date : **"+args[0]+"**")
  message.delete()
}

module.exports.config = {
  name: "addEvent",
  aliases: ["adev"],
  args: [],
  usage: ["addEvent"],
  desc: "Add an event to the list."
}
