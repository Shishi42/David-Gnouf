const Discord = require("discord.js")
const config = require("../config.json")

const path = require('path')
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

  commands = Array.from(bot.commands.keys())
  
  const embed = new Discord.MessageEmbed()
      .setColor('#553380')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setTimestamp();
  
  if(commands.includes(args[0])){
      
    embed.setAuthor((args[0].charAt(0).toUpperCase() + args[0].slice(1))+" Command Help", bot.user.displayAvatarURL(), "")
    embed.setDescription([
      `**❯ Description:** ${bot.commands.get(args[0]).config.desc}`,
      `**❯ Aliases:** ${(bot.commands.get(args[0]).config.aliases.length) ? bot.commands.get(args[0]).config.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
      `**❯ Arguments:** ${(bot.commands.get(args[0]).config.args.length) ? bot.commands.get(args[0]).config.args.map(args => `\`${args}\``).join(' ') : 'No Args'}`,
      `**❯ Usage:** ${config.prefix}${bot.commands.get(args[0]).config.usage}`	    
    ])
  }else if(bot.sound_collections.includes(args[0])){
    collection_name = args[0]
    sound_collection = fs.readdirSync(path.join(__dirname, "/audio/"+collection_name))
    embed.setAuthor(args[0]+" Sound List", bot.user.displayAvatarURL(), "")
    for (i = 0; i < sound_collection.length; i++){
      embed.addField(""+((i+1).toString())+". ", sound_collection[i])
    }
  }else{
    embed.setAuthor(bot.user.username+' Help Menu', bot.user.displayAvatarURL(), "")
    embed.setDescription([
	`Available commands for ${bot.user.username}`,
	]);
    for (i = 0; i < commands.length; i++){
      embed.addField(config.prefix+commands[i], bot.commands.get(commands[i]).config.desc)
    }
    embed.addField("Use "+config.prefix+"help <command> for more info.", '\u200b')	  
  }
  
  message.channel.send(embed)
  return message.delete()
}

module.exports.config = {
  name: "help",
  aliases: ["h","helpme"],
  args: ["<command>"],
  usage: ["help", "help <command>"],
  desc: "Display command list or specified command info."
}
