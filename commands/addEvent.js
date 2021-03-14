const Discord = require("discord.js")
const config = require("../config.json")

const fs = require("fs")

module.exports.run = async (bot, message, args) => {
      
  let messageArray = message.content.split(" ")
    
  date = messageArray[1]
  msg = args.slice(1).join(' ')
    
  if(bot.eventjson[date] === undefined) bot.eventjson[date] = new Array()
  bot.eventjson[date].push(msg)
  fs.writeFile("./event.json", JSON.stringify(bot.eventjson, null, 4), function(err) {})
   
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
