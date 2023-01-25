const Discord = require("discord.js")

module.exports = {

  name: "google",
  description: "Send google link with your search",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "search",
      description: "The search to make",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {
    await message.reply('https://www.google.fr/search?q='+args.get("search").value.split(" ").join('+'))
  }
}
