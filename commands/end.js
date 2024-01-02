const Discord = require("discord.js")

module.exports = {

  name: "end",
  description: "End the queue and leave the voice channel",
  permission: null,
  dm: false,
  category: "Music",

  async run(bot, message, args) {
    const queue = bot.player.nodes.get(message.guildId)

		if (!queue){
			await message.reply({content: "There are **no songs** in the queue.", ephemeral: true})
			return
		}

		queue.delete()
    await message.reply({content : "Queue has **ended**.", ephemeral : args == "dj"})
  }
}
