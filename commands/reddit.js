const Discord = require("discord.js")

module.exports = {

  name: "reddit",
  description: "Send beautified reddit link",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "link",
      description: "The link to beautify",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {
    return await message.reply('https://redd.it/'+args.get("link").value.split('/')[6])
  }
}
