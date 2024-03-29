const Discord = require("discord.js")

module.exports = {

  name: "fgo",
  description: "Compute the number of possible summon on FGO",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "quartz",
      description: "The number of Quartz you own",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "ticket",
      description: "The number of Summon Tickets you own",
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
