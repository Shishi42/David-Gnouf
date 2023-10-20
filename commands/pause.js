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

		queue.node.pause()
    await message.reply("Queue has been **paused**.")
  }
}
