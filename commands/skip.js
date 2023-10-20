const Discord = require("discord.js")

module.exports = {

  name: "skip",
  description: "Skip the current song in the queue",
  permission: null,
  dm: false,
  category: "Music",

  async run(bot, message, args) {
    const queue = bot.player.nodes.get(message.guildId)

		if (!queue){
			await message.reply({content: "There are no songs in the queue.", ephemeral: true})
			return
		}
    const currentSong = queue.currentTrack
    queue.node.skip()

    embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setDescription(`Skipped : **${currentSong.title}**.`)
      .addFields({name: "Author", value: `${currentSong.author}`})
      .setThumbnail(currentSong.thumbnail)
      .setFooter({text: `Song requested by ${currentSong.requestedBy.username}`, iconURL: `${currentSong.requestedBy.displayAvatarURL({dynamic: true})}`})

    await message.reply({ embeds: [embed] })
  }
}
