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

  bot.user.setPresence({status : 'dnd', activity: { name: 'Jean-Claude coder.', type: 'WATCHING' }})
})

bot.on("messageCreate", async message => {
  if(message.author.bot || message.channel.type === "dm" || !message.content.startsWith("!say")) return

  let args = message.content.split(" ").slice(1)

  if(args.length != 0){
    message.channel.send(args.join(' '))
  }
  return message.delete()
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
