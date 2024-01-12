const Discord = require("discord.js")

module.exports = {

  name: "say",
  description: "Send back what you say",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "text",
      description: "The text you want the bot to say back",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {
    await message.channel.send(args.get("text").value)
    return await message.reply({content: "Done.", ephemeral: true})
  }
}
