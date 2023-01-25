const Discord = require("discord.js")

module.exports = {

  name: "twitter",
  description: "Send beautified twitter links",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "end_link",
      description: "The links to beautified",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {

    msg = ""
    for(link of args.get("end_link").value.split(' ')){
      msg += "https://twitter.com/"+link+"\n"
    }

    await message.reply(msg)
  }
}
