const Discord = require("discord.js")

module.exports = {

  name: "list_event",
  description: "Show the list of registered events",
  permission: null,
  dm: true,
  category: "Utility",

  async run(bot, message, args) {

    let embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setTitle("List of Registered Events")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter({text: `Requested by ${message.user.username}`, iconURL: `${message.user.displayAvatarURL({dynamic: true})}`})

    for(key of Object.keys(bot.eventjson)) embed.addFields({name: key, value: String(bot.eventjson[key])})

    return await message.reply({embeds: [embed]})
  }
}
