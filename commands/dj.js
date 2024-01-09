const Discord = require("discord.js")

module.exports = {

  name: "dj",
  description: "Send DJ menu",
  permission: null,
  dm: false,
  category: "DnD",
  options: [
    {
      type: "channel",
      name: "channel",
      description: "The voice channel to connect to",
      required: true,
      channel_type: Discord.ChannelType.GuildVoice,
    },
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

    campaignSelect = new Discord.StringSelectMenuBuilder()
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
    song_row = new Discord.ActionRowBuilder().addComponents(songSelect)
    campaign_row = new Discord.ActionRowBuilder().addComponents(campaignSelect)

    return await message.reply({ content : `Distant channel is now ${bot.channels.cache.get(bot.distant_channel)}.`, embeds: [embed], components: [button_row, song_row, campaign_row] })
  }
}
