const Discord = require("discord.js")
const { QueryType, useMainPlayer } = require("discord-player")

module.exports = {

  name: "play",
  description: "Play a song from YouTube on your voice channel",
  permission: null,
  dm: false,
  category: "Music",
  options: [
    {
      type: "string",
      name: "url",
      description: "Link to a YouTube video or playlist",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "shuffle",
      description: "If you want the songs played in a random order",
      required: false,
      autocomplete: true,
    }
  ],

  async run(bot, message, args) {

    const player = useMainPlayer()

    shuffle = false

    if(args.source == "dj"){
      channel = bot.distant_channel
      url = args.url[0]
      message.dj = true
    } else {
      await message.deferReply()
      channel = message.member.voice.channel
      url = args.get("url").value
    }
    if (!channel) return message.editReply({content: "You need to be in a Voice Channel.", ephemeral: true})
    original_url = url

    if(Object.keys(bot.playlist).includes(url)){
      url = bot.playlist[url]
      shuffle = true
    }
    else if (!checkLink(url)) return message.editReply({content: "URL provided is invalid.", ephemeral: true})

    if ((args.source != "dj" && args.get("shuffle") && args.get("shuffle").value.toLowerCase() == "yes")) shuffle = true

    const searchResult = await player.search(url, { requestedBy: message.user })

    if (!searchResult.hasTracks()) {
      await message.editReply({content: "Could not find something at this URL.", ephemeral: true})
      return
    } else {
      try {
        if(shuffle) searchResult.tracks = searchResult.tracks.sort(() => Math.random() - 0.5)
        await player.play(channel, searchResult, { nodeOptions: { metadata: message }})

        if(Object.keys(bot.playlist).includes(original_url)){
          queue = bot.player.nodes.get(message.guildId)
          if (queue) queue.node.skipTo(searchResult.tracks[0])
        }

        let embed = new Discord.EmbedBuilder()
          .setColor(bot.color)
          .setTimestamp()
          .setFooter({text: `Requested by ${searchResult.requestedBy.username}`, iconURL: `${searchResult.requestedBy.displayAvatarURL({dynamic: true})}`})
        if(searchResult.hasPlaylist()){

          embed
            .addFields({name: "Description", value: `${searchResult.playlist.description}`})
            .addFields({name: "Duration", value: `${searchResult.tracks.length} songs`})
            .setThumbnail(searchResult.playlist.thumbnail)
          if(shuffle) embed.setDescription(`**${searchResult.playlist.title}** has been added as a **shuffled playlist** to the Queue`)
          else embed.setDescription(`**${searchResult.playlist.title}** has been added as a **playlist** to the Queue`)
        } else {
          embed
            .setDescription(`**${searchResult.tracks[0].title}** has been added to the Queue`)
            .addFields({name: "Author", value: `${searchResult.tracks[0].author}`})
            .addFields({name: "Duration", value: `${searchResult.tracks[0].duration}`})
            .setThumbnail(searchResult.tracks[0].thumbnail)
        } 
        if(args.source != "dj") await message.editReply({ embeds: [embed] })
      } catch (e) {
          return message.followUp(`Something went wrong: ${e}`)
      }
    }

    function checkLink(string){
      let url
      try { url = new URL(string) } catch (_) { return false }
      return (url.protocol === "http:" || url.protocol === "https:") && (string.includes("youtube.com") || string.includes("youtu.be"))
    }
  }
}
