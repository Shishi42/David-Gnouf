const Discord = require("discord.js")
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {

  emojiarray = [":v:",":raised_hand:",":fist:"]

  meschan = message.channel

  message.delete()

  function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms))
  }

  function randomChoice(){
    return Math.floor(Math.random() * Math.floor(3))
  }

  async function editmsg(m, str, t){
    await sleep(t)
    m.edit(str)
  }

  async function tsunomaki(){
    meschan.send("Tsunomaki Janken Start !")
    await sleep(1500)
      for (let i = 0; i < 4; i++) {
        meschan.send(`Tsunomaki, Tsunomaki`)
        await sleep(1500)
      }

    meschan.send("TSU").then(m => {
      editmsg(m, `TSU NO`, 1000)
      editmsg(m, `TSU NO`, 1000)
      editmsg(m, `TSU NO MA`, 1000)
      editmsg(m, `TSU NO MA KI`, 1000)
      editmsg(m, `TSU NO MA KI : JANKENPON ${emojiarray[randomChoice()]}`, 2000)
    })
  }

  tsunomaki()
}


module.exports.config = {
  name: "tsunomaki",
  aliases: ["tsu","tnmk","janken"],
  args: [],
  usage: ["tsunomaki"],
  desc: "Play the Tsunomaki Janken."
}
