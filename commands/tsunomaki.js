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

    msg2 = "TSU\n"
    await message.editReply(msg+msg2)
    await sleep(200)

    msg2 = "TSU NO\n"
    await message.editReply(msg+msg2)
    await sleep(200)

    msg2 = "TSU NO MA\n"
    await message.editReply(msg+msg2)
    await sleep(200)

    msg2 = "TSU NO MA KI\n"
    await message.editReply(msg+msg2)
    await sleep(200)

    msg2 = "TSU NO MA KI : JAN"
    await message.editReply(msg+msg2)
    await sleep(200)

    msg2 = "TSU NO MA KI : JANKEN"
    await message.editReply(msg+msg2)
    await sleep(100)

    msg2 = `TSU NO MA KI : JANKENPON ${emoji_array[Math.floor(Math.random() * Math.floor(3))]}\n`
    await message.editReply(msg+msg2)

  }
}
