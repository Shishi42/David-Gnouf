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
    min = args.get("min").value
    max = args.get("max").value
    dices = ["d2","d4","d6","d8","d10","d12","d20","d100"]

    dice = ""
    if(args.get("dice")){
      if(dices.includes(args.get("dice").value)) dice = args.get("dice").value.substring(1)
      else return message.reply({content: "The dice you provided is invalid.", ephemeral: true})
    }

    if(isNaN(min)) return message.reply({content: "The minimum time you provided is invalid.", ephemeral: true})
    if(isNaN(max)) return message.reply({content: "The maximum time you provided is invalid.", ephemeral: true})


    min = parseInt(min)
    max = parseInt(max)

    if(parseInt(min) >= parseInt(max)) return message.reply({content: "The minimum time should be inferior to the maximum time you provided.", ephemeral: true})

    res = `You will be notified between ${min} and ${max} minutes`
    if(dice) res += `, with a d${dice} roll.`
    else res += "."

    await message.reply({content: res, ephemeral: true})


    diff = max*60 - min*60
    rand_time = Math.floor(Math.random() * diff) + min*60
    if(dice) dice_roll = Math.floor(Math.random() * parseInt(dice))

    await sleep(rand_time*1000)

    res = `Wake the fuck up, ~~samurai~~ ${message.user}`
    if(dice) res += `, you rolled a ${dice_roll}.`
    else res += "."

    await message.followUp({content: res, ephemeral: true})

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
