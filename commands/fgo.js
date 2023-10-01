const Discord = require("discord.js")

module.exports = {

  name: "fgo",
  description: "Compute FGO number of possible summon",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "quartz",
      description: "Your number of Quartz",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "ticket",
      description: "Your number of Summon Tickets",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {

    quartz = parseInt(args.get("quartz").value) + (parseInt(args.get("ticket").value)*3)
    total = parseInt((quartz/30)*11) + parseInt((quartz%30)/3)

    return await message.reply({content: `You can do **${total} summons** (**${(total/330*100).toFixed(2)}%** of the pity) ➡️ **${(total*0.8).toFixed(2)}%** theoretical chance to get the featured 5⭐.`, ephemeral: true})
  }
}
