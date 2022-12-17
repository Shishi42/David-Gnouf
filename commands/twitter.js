const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  msg = ""

  args.forEach((arg) => {

    res = "https://twitter.com/"+arg+"\n"


    if (res.length + msg.length >= 2000){
      message.channel.send(msg)
      msg = ""
    }

    msg += res
  })

  message.channel.send(msg)
  return message.delete()
}

module.exports.config = {
  name: "twitter",
  aliases: ["tw","t"],
  args: ["<end_of_link>"],
  usage: ["twitter <end_of_link>"],
  desc: "Send beautified twitter link."
}
