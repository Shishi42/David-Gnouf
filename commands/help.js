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
      if(!command) return message.reply({ content: "No command with this name.", ephemeral : true })
    }
    
    let embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter({text: 'a BOT by @shishi4272', iconURL: 'https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png'})

    if(!command){

      categories = []
      bot.commands.forEach(command => { if(!categories.includes(command.category)) categories.push(command.category) })
      embed.setTitle("BOT Commands List")
      embed.setDescription(`Available commands : \`${bot.commands.size}\` \nAvailable categories : \`${categories.length}\``)

      await categories.sort().forEach(async cat => {
        let commands = bot.commands.filter(cmd => cmd.category === cat)
        embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
      })

    } else {
      embed.setTitle(`${command.name}`)
      embed.setDescription(`Description : \`${command.description}\` \nRequired permissions : \`${typeof command.permission !== "bigint" ? command.permission !== null ? command.permission : "Any" : new Discord.PermissionsBitField(command.permission).toArray(false)}\` \nCommand in DM : \`${command.dm ? "Yes" : "No"}\` \nCategory : \`${command.category}\``)
    }
    return await message.reply({embeds: [embed]})
  }
}
