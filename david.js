const Discord = require("discord.js")
const config = require("./config.json")

const bot = new Discord.Client({intents: 3276799})

const cron = require("cron")
const jsonfile = require ("jsonfile")
const fs = require("fs")
const { Player } = require("discord-player")

const Sequelize = require("sequelize")

bot.commands = new Discord.Collection()
bot.eventjson = {}
bot.color = "553380"

bot.player = new Player(bot)
bot.player.extractors.loadDefault()

bot.playlist = {

  "boss" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHlA4Nu4iV5qaepkJtCGpvum",
  "boss (Shishi)" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRYAaMLlPantdH2NETdusfPB",
  "combat" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHnppAcv5h-AmBdIDbzeAcdl",
  "combat (Shishi)" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRYMyc89UTRNZv8ykVjZgSIo",
  "exploration" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHkprT_od00SyPW8Sk21-CDd",
  "donjon" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHl771DkODYxiA2GOaKO9a34",
  "donjon (Shishi)" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRYpDQ1EV0fGPvpaipR_N4kc",
  "taverne" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHl7q5_z18NKdso8jiDRNYex",
  "ville (Shishi)" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRaHpBqAqDNJXNI5ZGnwIZ_G",

  "clamerde" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRb9RjeiWwQZ9UbHsV-AnasY",
  "ilécon" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRYLfQD-5gRohATO1_NhcUnK",
  "trofor" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRZwLdVUVcjilOwhOEnvLDbe",

  "[A,B,F,P,R,Y] Routes" : "https://youtu.be/9G6CskLxgMI",
  "[C] Le bois de Svalich" : "https://youtu.be/eePl-I8heFc",
  "[D,H,L] Cours d'eaux" : "https://youtu.be/4W2EfqdOmiI",
  "[E] Village de Barovie" : "https://youtu.be/nnEGIH1mXwI",
  "[E] Village de Barovie - Funeste demeure" : "https://youtu.be/GOTyzCntzJo",
  "[E] Village de Barovie - Donjon de la Funeste demeure" : "https://youtu.be/eqUiXz1tcmM",
  "[G] Campement du bief de Tser" : "https://youtu.be/7KFoj-SOfHs",
  "[I,J,K] Ravenloft" : "https://youtu.be/rfA-pzDkERs",
  "[K] Le château de Ravenloft - Catacombes" : "https://youtu.be/WPpVMmTt74Q",
  "[M] Le Mage Fou du Mont Baratok" : "https://youtu.be/dHRcgk7MBHw",
  "[N] La ville de Vallaki" : "https://youtu.be/2UPkwe_5p_w",
  "[O] Le moulin d'Esquilles" : "https://youtu.be/J63qJ_GFV_k",
  "[Q] Argynvostholt" : "https://youtu.be/K08IQhgXDWQ",
  "[S] Krezk" : "https://youtu.be/ZRnLm7BJMnw",
  "[S] Krezk - Abbaye Sainte Markovia" : "https://youtu.be/8AODR94oNMo",
  "[S] Krezk - Madhouse" : "https://youtu.be/1gDfJHT5n0U",
  "[T] La passe de Tsolenka" : "https://youtu.be/L_eIOeXIEfo",
  "[U] Les ruines de Bérez" : "https://youtu.be/9MsH9vN1aFQ",
  "[V] La Tour de Van Richten" : "https://youtu.be/1u7rJTtlbKw",
  "[W] Le Magicien des Vins" : "https://youtu.be/4hT8zvR-nkg",
  "[X] Le Temple d'Ambre" : "https://youtu.be/Dd91LPwFAMk",
  "[Z] La tanière des loups-garous" : "https://youtu.be/128kAIlwh4g",
  "[?] Les brumes de Ravenloft" : "https://youtu.be/J41ipvUvIzI",

}

fs.readdirSync("./events/").filter(f => !f.startsWith(".")).forEach(async file => {
  let event = require(`./events/${file}`)
  bot.on(file.split(".js").join(""), event.bind(null, bot))
})
bot.player.events.on("playerStart", require(`./events/.playerStart.js`).bind(null, bot))
bot.player.events.on("queueDestroy", require(`./events/.queueDestroy.js`).bind(null, bot))

if(fs.existsSync("./event.json")){
  bot.eventjson = jsonfile.readFileSync("./event.json")
}

let event_job = new cron.CronJob('00 00 00 * * *', () => {
  var date = new Date()
  datestr = date.getDate().toString()+"/"+(date.getMonth()+1).toString()
  if(bot.eventjson[datestr] != undefined) bot.channels.cache.get("295252502679650315").send("<@&474513550992211979> "+bot.eventjson[datestr])
}).start()

bot.login(config.token)
