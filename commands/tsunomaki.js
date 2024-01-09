const Discord = require("discord.js")

module.exports = {

  name: "tsunomaki",
  description: "Play Tsunomaki Janken",
  permission: null,
  dm: true,
  category: "Simp",

  async run(bot, message, args) {
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    await message.deferReply()

    msg = "Tsunomaki Janken Start !\n"

    emoji_array = [":v:",":raised_hand:",":fist:"]

    await message.editReply(msg)
    await sleep(1500)

    for(let i = 0; i < 4; i++){
      msg+="Tsunomaki, Tsunomaki\n"
      await message.editReply(msg)
      await sleep(1000)
    }

    await message.editReply(msg+"TSU\n")
    await sleep(200)

    await message.editReply(msg+"TSU NO\n")
    await sleep(200)

    await message.editReply(msg+"TSU NO MA\n")
    await sleep(200)

    await message.editReply(msg+"TSU NO MA KI\n")
    await sleep(200)

    await message.editReply(msg+"TSU NO MA KI : JAN")
    await sleep(200)

    await message.editReply(msg+"TSU NO MA KI : JANKEN")
    await sleep(100)

    return await message.editReply(msg+`TSU NO MA KI : JANKENPON ${emoji_array[Math.floor(Math.random() * Math.floor(3))]}\n`)
  }
}
