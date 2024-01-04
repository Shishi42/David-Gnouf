const Discord = require("discord.js")

module.exports = async (bot, queue, track) => {
  embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setDescription(`Starting playing : **${track.title}**.`)
    .addFields({name: "Author", value: `${track.author}`})
    .addFields({name: "Duration", value: `${track.duration}`})
    .addFields({name: "Views", value: `${track.views}`})
    .setThumbnail(track.thumbnail)
    .setTimestamp()
    .setFooter({text: `Song requested by ${track.requestedBy.username}`, iconURL: `${track.requestedBy.displayAvatarURL({dynamic: true})}`})
  if(track.playlist) embed.addFields({name: "Playlist", value: `${track.playlist.title}`})

  if(!bot.distant_channel) queue.metadata.channel.send({ embeds: [embed] })
}
