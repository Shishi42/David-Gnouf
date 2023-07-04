const Discord = require("discord.js")

module.exports = {

  name: "fx",
  description: "Fix twitter link in Discord",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "twitter_link",
      description: "The link to be fix",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {

    if(!args.get("twitter_link").value.startsWith("https://twitter.com")) message.reply({content: `Link provided is not from Twitter.`, ephemeral: true})

    else {
      res = args.get("twitter_link").value.split("https://twitter.com/")[1].split("?")[0]
      message.reply("https://fxtwitter.com/"+res)
    }
  }
}
