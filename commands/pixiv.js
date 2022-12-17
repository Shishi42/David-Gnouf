const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  msg = ""

  args.forEach((arg) => {

    if(arg.startsWith("u")) res = "https://www.pixiv.net/en/users/"+arg.split("u")[1]+"\n"
    else res = "https://www.pixiv.net/en/artworks/"+arg+"\n"

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
  name: "pixiv",
  aliases: ["pix","p"],
  args: ["[artwork_id OR u<user_id>]"],
  usage: ["pixiv [artwork_id OR u<user_id>]"],
  desc: "Send pixiv artwork or user link with your ids."
}
