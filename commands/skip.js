const Discord = require("discord.js")

module.exports = {

  name: "skip",
  description: "Skip the current song in the queue",
  permission: null,
  dm: false,
  category: "Music",
  options: [
    {
      type: "string",
      name: "number",
      description: "Number of song to skip",
      required: false,
      autocomplete: false,
    },
  ],

  async run(bot, message, args) {
    const queue = bot.player.nodes.get(message.guildId)

		if (!queue){
			await message.reply({content: "There are **no songs** in the queue.", ephemeral: true})
			return
		}

    if(args && args != "dj" && args.get("number") && isNaN(args.get("number").value)) return message.reply({content: "The number of skip you provided is invalid.", ephemeral: true})
    if(args && args != "dj" && args.get("number") && parseInt(args.get("number").value) >= queue.tracks.data.length) return message.reply({content: `The number of skip you provided is greater than the number of songs in the queue :arrow_right: **${queue.tracks.data.length}** songs.`, ephemeral: true})

    args && args != "dj" && args.get("number") ? num = parseInt(args.get("number").value) : num = 1

    const currentSong = queue.currentTrack
    embed = new Discord.EmbedBuilder()
    if(queue.tracks.data.length == 0) queue.delete()
    else queue.node.skipTo(num-1)

    if(num == 1){
      embed
        .setColor(bot.color)
        .setDescription(`Skipped : **${currentSong.title}**.`)
        .addFields({name: "Author", value: `${currentSong.author}`})
        .setThumbnail(currentSong.thumbnail)
        .setFooter({text: `Song requested by ${currentSong.requestedBy.username}`, iconURL: `${currentSong.requestedBy.displayAvatarURL({dynamic: true})}`})
    } else {
      embed
        .setColor(bot.color)
        .setDescription(`Skipped **${num} songs**.`)
        .setFooter({text: `Song requested by ${currentSong.requestedBy.username}`, iconURL: `${currentSong.requestedBy.displayAvatarURL({dynamic: true})}`})
    }

    await message.reply({ embeds: [embed], ephemeral : args == "dj"})
  }
}
