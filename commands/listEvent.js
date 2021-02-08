const Discord = require("discord.js")
const config = require("../config.json");
const fs = require("fs");
const jsonfile = require ("jsonfile")

module.exports.run = async (bot, message, args) => {
  var eventjson = {}

  if(fs.existsSync("./event.json")){
    eventjson = jsonfile.readFileSync("./event.json")
  }

  str = JSON.stringify(eventjson, null, "  ");
  message.channel.send("Liste des event : \n"+str)
  message.delete()
}

module.exports.config = {
  name: "listEvent",
  aliases: ["lev"]
}
