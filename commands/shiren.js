const Discord = require("discord.js")

module.exports = {

  name: "shiren",
  description: "Randomly notify the user in a defined period",
  permission: null,
  dm: true,
  category: "DnD",
  options: [
    {
      type: "string",
      name: "min",
      description: "The minimum time in minutes to be notified",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "max",
      description: "The maximum time in minutes to be notified",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "dice",
      description: "Dice to roll at the same time",
      required: false,
      autocomplete: true,
    }
  ],

  async run(bot, message, args) {

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
    
    min = args.get("min").value
    max = args.get("max").value
    dice = ""
    
    if(args.get("dice")){
      if(["d2","d4","d6","d8","d10","d12","d20","d100"].includes(args.get("dice").value)) dice = args.get("dice").value.substring(1)
      else return message.reply({content: "The dice you provided is invalid.", ephemeral: true})
    }

    if(isNaN(min) || isNaN(max)) return message.reply({content: "The times you provided are invalid.", ephemeral: true})

    min = parseInt(min)
    max = parseInt(max)

    if(min >= max) return message.reply({content: "The minimum time should be inferior to the maximum time you provided.", ephemeral: true})

    await message.reply({content: `You will be notified between ${min} and ${max} minutes${dice ? `, with a d${dice} roll` : ''}.`, ephemeral: true})

    if(dice) dice_roll = Math.floor(Math.random() * parseInt(dice))

    await sleep((Math.floor(Math.random() * (max*60 - min*60)) + min*60)*1000)

    return await message.member.send(`Wake the fuck up, ~~samurai~~ ${message.user}${dice ? `, you rolled a ${dice_roll}` : ''}.`)
  }
}
