const Discord = require("discord.js")

module.exports = {

  name: "pixiv",
  description: "Send pixiv artwork or user link with your ids",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "ids",
      description: "The ids to search",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {

    await message.deferReply()

    msg = ""

    for(id of args.get("ids").value.split(' ')){
      if(id.startsWith("u")) res = "https://www.pixiv.net/en/users/"+id.split("u")[1]+"\n"
      else res = "https://www.pixiv.net/en/artworks/"+id+"\n"

      if(res.length + msg.length >= 2000){
        await message.followUp(msg)
        msg = ""
      }
      msg += res
    }

    await message.followUp(msg)
  }
}
