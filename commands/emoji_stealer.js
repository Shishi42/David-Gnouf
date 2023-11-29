const Discord = require("discord.js")

module.exports = {

  name: "emoji_stealer",
  description: "Steal an emoji and upload it to server",
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "emoji",
      description: "The emoji to steal",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {

    regex = new RegExp("<[a]{0,1}:.*[a-z]:.*[0-9]>")
    if(!regex.test(args.get("emoji").value)) return message.reply({content: "Emoji provided is invalid.", ephemeral: true})

    emoji = args.get("emoji").value.split(':')
    name = emoji[1]
    id = emoji[2].slice(0, -1)

    extension = emoji[0].includes('a') ? "gif" : "png"

    message.guild.emojis.create({ attachment: `https://cdn.discordapp.com/emojis/${id}.${extension}`, name: name })
      .then(emoji => message.reply({content: `Emoji **${emoji.name}** successfully stolen. ${emoji}`, ephemeral: true}))
      .catch(e => message.reply({content: "Couldn't add emoji to the server.", ephemeral: true}))

    // await message.reply('https://www.google.fr/search?q='+args.get("search").value.split(" ").join('+'))
  }
}
