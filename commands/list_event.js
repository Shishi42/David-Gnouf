const Discord = require("discord.js")

module.exports = {

  name: "list_event",
  description: "Show the BOT list of events",
  permission: null,
  dm: true,
  category: "Utility",

  async run(bot, message, args) {

    let embed = new Discord.EmbedBuilder()
    .setColor('#553380')
    .setTitle("David Gnouf list of events")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})

    for(key of Object.keys(bot.eventjson)){
      embed.addFields({name: key, value: String(bot.eventjson[key])})
    }

    await message.reply({embeds: [embed]})
  }
}
