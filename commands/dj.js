const Discord = require("discord.js")

module.exports = {

  name: "dj",
  description: "Send DJ menu",
  permission: null,
  dm: false,
  category: "Music",
  options: [
    {
      type: "channel",
      name: "channel",
      description: "The voice channel to connect to",
      required: true,
      autocomplete: true,
      channel_types: 2,
    }
  ],

  async run(bot, message, args) {

    bot.distant_channel = args.get("channel").value

    embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle("DJ Menu")
      .setDescription(":play_pause: : Play/Pause\n:arrow_right: : Skip\n:arrow_double_down: : Queue\n:x: : Leave")
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setFooter({text: `Requested by ${message.user.username}`, iconURL: `${message.user.displayAvatarURL({dynamic: true})}`})

    playpause = new Discord.ButtonBuilder()
      .setCustomId("playpause")
      .setEmoji('⏯️')
      .setStyle(Discord.ButtonStyle.Primary)

    skip = new Discord.ButtonBuilder()
      .setCustomId("skip")
      .setEmoji('➡️')
      .setStyle(Discord.ButtonStyle.Secondary)

    queue = new Discord.ButtonBuilder()
      .setCustomId("queue")
      .setEmoji('⏬')
      .setStyle(Discord.ButtonStyle.Secondary)

    leave = new Discord.ButtonBuilder()
      .setCustomId("leave")
      .setEmoji('❌')
      .setStyle(Discord.ButtonStyle.Secondary)

    channelSelect = new Discord.ChannelSelectMenuBuilder()
  			.setCustomId("channel")
  			.setPlaceholder("Select voice channel")
  			.setMinValues(1)
  			.setMaxValues(1)
        .addChannelTypes(Discord.ChannelType.GuildVoice)

    songSelect = new Discord.StringSelectMenuBuilder()
  			.setCustomId("song")
  			.setPlaceholder("Select song or playlist")
  			.setMinValues(1)
  			.setMaxValues(1)
        .addOptions(
          Object.keys(bot.playlist).filter(s => !s.startsWith("[")).slice(0, 20).map((url) =>
            new Discord.StringSelectMenuOptionBuilder()
              .setLabel(url)
              .setValue(url))
        )
    campaingSelect = new Discord.StringSelectMenuBuilder()
  			.setCustomId("campaing_song")
  			.setPlaceholder("Select campaign song or playlist")
  			.setMinValues(1)
  			.setMaxValues(1)
        .addOptions(
          Object.keys(bot.playlist).filter(s => s.startsWith("[")).slice(0, 25).map((url) =>
            new Discord.StringSelectMenuOptionBuilder()
              .setLabel(url)
              .setValue(url))
        )

    button_row = new Discord.ActionRowBuilder().addComponents(playpause, skip, queue, leave)
    channel_row = new Discord.ActionRowBuilder().addComponents(channelSelect)
    song_row = new Discord.ActionRowBuilder().addComponents(songSelect)
    campaign_row = new Discord.ActionRowBuilder().addComponents(campaingSelect)

    await message.reply({ content : `Distant channel is now ${bot.channels.cache.get(bot.distant_channel)}.`, embeds: [embed], components: [button_row, song_row, campaign_row] })
  }
}
