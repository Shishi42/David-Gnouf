const Discord = require("discord.js")
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  message.channel.send("Marche pô")
}

module.exports.config = {
  name: "play",
  aliases: ["music"]

}