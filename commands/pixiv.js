const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  args.forEach((arg) => {
    if(arg.startsWith("u")) message.channel.send("https://www.pixiv.net/en/users/"+arg.split("u")[1])
    else message.channel.send("https://www.pixiv.net/en/artworks/"+arg)
  })

  return message.delete()
}

module.exports.config = {
  name: "pixiv",
  aliases: ["pix","p"],
  args: ["[artwork_id OR u<user_id>]"],
  usage: ["pixiv [artwork_id OR u<user_id>]"],
  desc: "Send pixiv artwork or user link with your ids."
}
