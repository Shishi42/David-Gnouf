const Discord = require("discord.js")
const config = require("./config.json")

const bot = new Discord.Client({intents: 3276799})

const slashcommands_loader = require("./slashcommands_loader")

const cron = require("cron")
const jsonfile = require ("jsonfile")
const fs = require("fs")

bot.commands = new Discord.Collection()
bot.eventjson = {}
bot.color = "553380"

if(fs.existsSync("./event.json")){
  bot.eventjson = jsonfile.readFileSync("./event.json")
}

bot.on("ready", async () => {
  console.log(`Connecté en tant que ${bot.user.tag}!`)

  await slashcommands_loader(bot)

  bot.user.setPresence({activities: [{ name: "Jean-Claude coder", type: 3 }], status: 'dnd'})
})

bot.on("messageCreate", async message => {

  if(message.author.bot || message.channel.type === "dm") return

  // prepix code
  if(message.channel.id == config.chan_prepix){
    
    if (message.content.includes("SauceNAO")){
      if(message.content.includes("&illust_id")){
        res = message.content.split("&illust_id=")[1].split(")")[0]
        bot.channels.fetch(config.chan_artworks)
          .then(chan => chan.messages.fetch()
            .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
            .catch((error) => {
              bot.channels.cache.get(config.chan_artworks).send(res)
            }))
        return message.delete()
      } else if (message.content.includes("member.php&id")){
        res = message.content.split("member.php&id=")[1].split(")")[0]
        bot.channels.fetch(config.chan_users)
          .then(chan => chan.messages.fetch()
            .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
            .catch((error) => {
              bot.channels.cache.get(config.chan_users).send(res)
            }))
        return message.delete()
      }
    } else if(message.content.includes("twitter") || message.content.includes("x.com")) {
      res = message.content.split(".com/")[1].split("?")[0].split(")")[0]
      bot.channels.fetch(config.chan_sort)
        .then(chan => chan.messages.fetch()
          .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
          .catch((error) => {
            bot.channels.cache.get(config.chan_sort).send(res)
          }))
      return message.delete()
    } else if (message.content.includes("artworks")){
      res = message.content.split("artworks/")[1].split(")")[0]
      bot.channels.fetch(config.chan_artworks)
        .then(chan => chan.messages.fetch()
          .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
          .catch((error) => {
            bot.channels.cache.get(config.chan_artworks).send(res)
          }))
      return message.delete()
    } else if (message.content.includes("users")){
      res = message.content.split("users/")[1].split(")")[0]
      bot.channels.fetch(config.chan_users)
        .then(chan => chan.messages.fetch()
          .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
          .catch((error) => {
            bot.channels.cache.get(config.chan_users).send(res)
          }))
      return message.delete()
    }
  }

  // say command code
  if(message.content.startsWith("!say")){
    let args = message.content.split(" ").slice(1)

    if(args.length != 0){
      message.channel.send(args.join(' '))
    }
    return message.delete()
  }
})

bot.on("interactionCreate", async interaction => {

  if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

    let entry = interaction.options.getFocused()

    if(interaction.commandName === "help") {
      let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
      await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
    }
  }

  if(interaction.type === Discord.InteractionType.ApplicationCommand) {
   let command = require(`./commands/${interaction.commandName}`)
   command.run(bot, interaction, interaction.options)
  }
})

let event_job = new cron.CronJob('00 00 00 * * *', () => {
  checkEvent()
})

function checkEvent(){
  var date = new Date()
  datestr = date.getDate().toString()+"/"+(date.getMonth()+1).toString()
  if(bot.eventjson[datestr] != undefined){
    bot.channels.cache.get("295252502679650315").send("<@&474513550992211979> "+bot.eventjson[datestr])
  }
}

event_job.start()

bot.login(config.token)
