const Discord = require("discord.js")

module.exports = {

  name: "pixiv",
  description: "Send pixiv links from ids",
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
      if(id.startsWith("u")) res = "https://www.pixiv.net/en/users/"+id.split("u")[1]+"/illustrations \n"
      else res = "https://www.pixiv.net/en/artworks/"+id+"\n"

      if(res.length + msg.length >= 2000){
        await message.followUp(msg)
        msg = ""
      }
      msg += res
    }

    return await message.followUp(msg)
  }
}
