const Discord = require("discord.js")

module.exports = {

  name: "resume",
  description: "Resume the current queue",
  permission: null,
  dm: false,
  category: "Music",

  async run(bot, message, args) {
    const queue = bot.player.nodes.get(message.guildId)

		if (!queue){
			await message.reply({content: "There are **no songs** in the queue.", ephemeral: true})
			return
		}

		queue.node.resume()
    await message.reply("Queue has been **resumed**.")
  }
}
