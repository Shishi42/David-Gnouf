const Discord = require("discord.js")

module.exports = {

  name: "fx",
  description: "Fix Twitter / X link in Discord",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "link",
      description: "The Twitter / X link to be fix",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {

    if(!args.get("link").value.startsWith("https://twitter.com") && !args.get("link").value.startsWith("https://x.com")) message.reply({content: `Link provided is not from Twitter / X.`, ephemeral: true})

    else {
      res = args.get("link").value.split(".com/")[1].split("?")[0]
      message.reply(`https://fxtwitter.com/${res}`)
    }
  }
}
