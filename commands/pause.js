const Discord = require("discord.js")

module.exports = {

  name: "pause",
  description: "Pause the current queue",
  permission: null,
  dm: false,
  category: "Music",

  async run(bot, message, args) {
    const queue = bot.player.nodes.get(message.guildId)

		if (!queue){
			await message.reply({content: "There are **no songs** in the queue.", ephemeral: true})
			return
		}

    if(!queue.node.isPlaying()){
      queue.node.resume()
      await message.reply({ content: "Queue has been **resumed**.", ephemeral : args == "dj"})
    } else {
      queue.node.pause()
      await message.reply({ content: "Queue has been **paused**.", ephemeral : args == "dj"})
    }
  }
}
