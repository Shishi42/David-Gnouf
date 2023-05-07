const Discord = require("discord.js")
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice")

module.exports = {

  name: "countdown",
  description: "Provide a text and play a 5sec on voice channel countdown",
  permission: null,
  dm: true,
  category: "Utility",

  async run(bot, message, args) {

    await message.deferReply()

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    if(message.member.voice.channel){

      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.member.voice.channel.guildId,
        adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
      })

      const player = createAudioPlayer()
      player.play(createAudioResource("./5s_countdown.mp3"))
      connection.subscribe(player)
    }

    await sleep(1000)
    for(let i = 0; i <= 5; i++){
      if(5-i == 0) await message.editReply("GO")
      else await message.editReply(String(5-i)+"..")
      await sleep(1000)
    }

    if(message.member.voice.channel){
      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.member.voice.channel.guildId,
        adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
      }).destroy()
    }
  }
}