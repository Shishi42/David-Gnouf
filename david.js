const Discord = require("discord.js");
const cron = require("cron");

const bot = new Discord.Client();
const config = require("./config.json");

const jsonfile = require ("jsonfile")

const fs = require("fs");
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

var eventjson = {}

if(fs.existsSync("./event.json")){
  eventjson = jsonfile.readFileSync("./event.json")
}

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")

  if(jsfile.length <= 0){
    return console.log("[LOGS] ne trouve pas de commandes!");
  }

  jsfile.forEach((f, i) => {
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

  if(messageArray[0] === "$addEvent"){
    addEvent(messageArray[1], args.slice(1).join(' '))
  }
})

let job = new cron.CronJob('00 00 18 * * *', () => {
  bot.channels.cache.get(config.chan_dev).send("<@&750339448398675988> Va revis... ah bah nan, va dessiner connard-man");
  bot.channels.cache.get(config.chan_dev).send("<@&750339318270132274> Va revis... ah bah nan, va trouver un stage et reviser ton jap + ton code connard-man");
});

let jobdate = new cron.CronJob('00 00 00 * * *', () => {
  checkEvent()
});


function checkEvent(){
  var date = new Date();

  datestr = date.getDate().toString()+"/"+(date.getMonth()+1).toString()

  for (var i = 0; i < eventjson[datestr].length; i++) {
    bot.channels.cache.get("295252502679650315").send("<@&474513550992211979> "+eventjson[datestr][i]);
  }
}

function addEvent(date, msg){
  if(eventjson[date] === undefined) eventjson[date] = new Array()
  eventjson[date].push(msg)
  fs.writeFile("./event.json", JSON.stringify(eventjson, null, 4), function(err) {})
}

job.start()
jobdate.start()


bot.login(config.token);