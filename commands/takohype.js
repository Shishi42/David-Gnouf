const Discord = require("discord.js")

module.exports = {

  name: "takohype",
  description: "Provide a tako hype",
  permission: null,
  dm: true,
  category: "Simp",

  async run(bot, message, args) {
    return await message.reply('<:rightglow:841350350580482048><:pat:841350350534475807><:leftglow:841350350493450290>')
  }
}
