const Discord = require("discord.js");
const cron = require("cron");

const bot = new Discord.Client();
const config = require("./config.json");

const fs = require("fs")
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

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

})

let job1 = new cron.CronJob('00 00 18 * * *', () => {
  bot.users.cache.get("243136558797029376").send("Va reviser ton jap et ton code connard-man");
  bot.users.cache.get("295219242091937792").send("Va dessiner connard-man");
});

let job2 = new cron.CronJob('00 00 17 * * *', () => {
  bot.users.cache.get("243136558797029376").send("Un nouveau jour se lève sur SD");
  bot.users.cache.get("243136558797029376").send("Daily missions : ");
  bot.users.cache.get("243136558797029376").send("- Score 5 goals");
  bot.users.cache.get("243136558797029376").send("- Use 10 hissatsu");
  bot.users.cache.get("243136558797029376").send("- Win twice");
  bot.users.cache.get("243136558797029376").send("- Play once at Inabikari Center");
  bot.users.cache.get("243136558797029376").send("- Send ball to friend");
  bot.users.cache.get("243136558797029376").send("- Spin the login roulette");
  bot.users.cache.get("243136558797029376").send("- Purchase something");
  bot.users.cache.get("243136558797029376").send("------------------------------");

});

let jobtemp = new cron.CronJob('00 55 1,4,11,15 * * *', () => {
  bot.users.cache.get("243136558797029376").send('Il est temps de farmer.\nLe bonus est dans 5min.');
});

job1.start()
job2.start()

bot.login(config.token);
