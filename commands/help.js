const Discord = require("discord.js")

module.exports = {

  name: "help",
  description: "Show help menu",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "command",
      description: "Command to show",
      required: false,
      autocomplete: true,
    }
  ],

  async run(bot, message, args) {

    let command
    if(args.get("command")){
      command = bot.commands.get(args.get("command").value)
      if(!command) return message.reply("No command with this name")
    }

    if(!command){

      let categories = []
      bot.commands.forEach(command => {
        if(!categories.includes(command.category)) categories.push(command.category)
      })

      let embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle("BOT Commands")
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      .setDescription(`Available commands : \`${bot.commands.size}\` \nAvailable categories : \`${categories.length}\``)
      .setTimestamp()
      .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})

      await categories.sort().forEach(async cat => {
        let commands = bot.commands.filter(cmd => cmd.category === cat)
        embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
      })

      await message.reply({embeds: [embed]})

    } else {

      let embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`Command **${command.name}**`)
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      .setDescription(`Name : \`${command.name}\` \nDescription : \`${command.description}\` \nRequired permissions : \`${typeof command.permission !== "bigint" ? command.permission !== null ? command.permission : "Any" : new Discord.PermissionsBitField(command.permission).toArray(false)}\` \nCommand in DM : \`${command.dm ? "Yes" : "No"}\` \nCategory : \`${command.category}\``)
      .setTimestamp()
      .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})

      await message.reply({embeds: [embed]})
    }
  }
}
