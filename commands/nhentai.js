const Discord = require("discord.js")

module.exports = {

  name: "nhentai",
  description: "Send nhentai link with your magic number",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "number",
      description: "The magic number to search",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {
    return await message.reply('https://www.nhentai.net/g/'+args.get("number").value)
  }
}
