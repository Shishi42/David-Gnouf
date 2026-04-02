const Discord = require("discord.js")
const config = require("./config.json")

const bot = new Discord.Client({intents: 3276799})

const cron = require("cron")
const jsonfile = require ("jsonfile")
const fs = require("fs")
const { Player } = require("discord-player")

bot.commands = new Discord.Collection()
bot.color = "553380"

bot.player = new Player(bot)
bot.player.extractors.loadDefault()

fs.readdirSync("./events/").filter(f => f.endsWith(".js")).forEach(async file => {
  let event = require(`./events/${file}`)
  if(!file.startsWith(".")) bot.on(file.split(".js").join(""), event.bind(null, bot))
  else bot.player.events.on(file.split(".js").join("").slice(1), event.bind(null, bot))
})

if(fs.existsSync("./event.json")) bot.eventjson = jsonfile.readFileSync("./event.json")

new cron.CronJob('00 00 00 * * *', () => {
  var date = new Date()
  datestr = date.getDate().toString()+"/"+(date.getMonth()+1).toString()
  if(bot.eventjson[datestr] != undefined) bot.channels.cache.get("295252502679650315").send("<@&474513550992211979> "+bot.eventjson[datestr])
}).start()

bot.owner = config.bot_owner
// new cron.CronJob('22 * * * *', () => { bot.users.fetch(bot.owner).then(user => user.send("$mx disponible")) }).start()
new cron.CronJob('22 2,5,8,11,14,17,20,23 * * *', () => { bot.users.fetch(bot.owner).then(user => user.send("claim disponible")) }).start()
// new cron.CronJob('0 */2 * * *', () => { bot.users.fetch(bot.owner).then(user => user.send("$p disponible"))}).start()
// new cron.CronJob('0 0 * * *', () => { bot.users.fetch(bot.owner).then(user => user.send("$dk et $daily disponible")) }).start()

bot.login(config.token)
