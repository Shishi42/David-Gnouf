const Discord = require("discord.js")
const config = require("./config.json")

const bot = new Discord.Client()

const cron = require("cron")
const jsonfile = require ("jsonfile")
const fs = require("fs")

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()
bot.eventjson = {}

if(fs.existsSync("./event.json")){
  bot.eventjson = jsonfile.readFileSync("./event.json")
}

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")

  if(jsfile.length <= 0){
    return console.log("[LOGS] ne trouve pas de commandes!");
  }
  
  //console.log("[LOGS] commandes trouvées :")
  jsfile.forEach((f, i) => {
    //console.log(f)
    let pull = require(`./commands/${f}`)
    bot.commands.set(pull.config.name, pull)
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name)
    })
  })

})

bot.on("ready", async () => {
  console.log(`Connecté en tant que ${bot.user.tag}!`);
  bot.channels.cache.get(config.chan_dev).send('David est connecté.\nIncroyable du cul !');

  bot.user.setPresence({status : 'dnd', activity: { name: 'Jean-Claude coder.', type: 'WATCHING' }});
})

bot.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm" || !message.content.startsWith(config.prefix)) return;

  let prefix = config.prefix
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)

  let commandFile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
  if(commandFile) commandFile.run(bot, message, args)
})

let job = new cron.CronJob('00 00 18 * * *', () => {
  bot.channels.cache.get(config.chan_dev).send("<@&750339448398675988> Va revis... ah bah nan, va dessiner et fait tes devoirs");
  bot.channels.cache.get(config.chan_dev).send("<@&750339318270132274> Révise Duolingo + Kanji, passe l'aspi, brosse le chat et joue à Genshin");
});

let jobdate = new cron.CronJob('00 00 00 * * *', () => {
  checkEvent()
});

function checkEvent(){
  var date = new Date();
  datestr = date.getDate().toString()+"/"+(date.getMonth()+1).toString()
  if(bot.eventjson[datestr] != undefined){
    for (var i = 0; i < bot.eventjson[datestr].length; i++) {
      bot.channels.cache.get("295252502679650315").send("<@&474513550992211979> "+bot.eventjson[datestr][i]);
    }
  }  
}

job.start()
jobdate.start()

bot.login(config.token);
