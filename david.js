const Discord = require("discord.js")
const config = require("./config.json")

const bot = new Discord.Client({intents: 3276799})

const slashcommands_loader = require("./slashcommands_loader")

const cron = require("cron")
const jsonfile = require ("jsonfile")
const fs = require("fs")
const { Player } = require("discord-player")

const Sequelize = require("sequelize")

bot.commands = new Discord.Collection()
bot.eventjson = {}
bot.color = "553380"

if(fs.existsSync("./event.json")){
  bot.eventjson = jsonfile.readFileSync("./event.json")
}

bot.player = new Player(bot)
bot.player.extractors.loadDefault()

bot.playlist = {
  "combat" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHnppAcv5h-AmBdIDbzeAcdl",
  "exploration" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHkprT_od00SyPW8Sk21-CDd",
  "taverne" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHl7q5_z18NKdso8jiDRNYex",
  "donjon" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHl771DkODYxiA2GOaKO9a34",
}

bot.on("ready", async () => {
  console.log(`Connected as ${bot.user.tag}!`)

  bot.db = new Sequelize({
    dialect: "sqlite",
    storage: "./sleep.db"
  })

  bot.Pokemons = bot.db.define("pokemon", {
    pokemon_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    pokemon_nom: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    pokemon_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    type_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    skill_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pokemon_tier: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })

  bot.Types = bot.db.define("type", {
    type_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    type_nom: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    type_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  })

  bot.Skills = bot.db.define("skill", {
    skill_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    skill_nom: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    skill_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    skill_tier_early: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    skill_tier_late: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  })

  bot.Subskills = bot.db.define("subskill", {
    subskill_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    subskill_nom: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    subskill_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  })

  bot.Natures = bot.db.define("natures", {
    nature_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    nature_nom: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    nature_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    nature_incr_fr: {
      type: Sequelize.STRING,
    },
    nature_incr_en: {
      type: Sequelize.STRING,
    },
    nature_decr_fr: {
      type: Sequelize.STRING,
    },
    nature_decr_en: {
      type: Sequelize.STRING,
    },
  })

  await bot.Pokemons.sync()
  await bot.Types.sync()
  await bot.Skills.sync()
  await bot.Subskills.sync()
  await bot.Natures.sync()

  if(!await bot.Pokemons.findOne()) await require("./db_load.js").run(bot)

  console.log("Database Online.")

  await slashcommands_loader(bot)

  bot.user.setPresence({activities: [{ name: "Jean-Claude coder", type: 3 }], status: "dnd"})
})

bot.on("messageCreate", async message => {

  if(message.author.bot || message.channel.type === "dm") return

  // prepix code
  if(message.channel.id == config.chan_prepix){

    if (message.content.includes("SauceNAO")){
      if(message.content.includes("&illust_id")){
        res = message.content.split("&illust_id=")[1].split(')')[0]
        bot.channels.fetch(config.chan_artworks)
          .then(chan => chan.messages.fetch()
            .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
            .catch((error) => {
              bot.channels.cache.get(config.chan_artworks).send(res)
            }))
        return message.delete()
      } else if (message.content.includes("member.php&id")){
        res = message.content.split("member.php&id=")[1].split(')')[0]
        bot.channels.fetch(config.chan_users)
          .then(chan => chan.messages.fetch()
            .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
            .catch((error) => {
              bot.channels.cache.get(config.chan_users).send(res)
            }))
        return message.delete()
      }
    } else if(message.content.includes("twitter") || message.content.includes("x.com")) {
      res = message.content.split(".com/")[1].split('?')[0].split(')')[0]
      bot.channels.fetch(config.chan_sort)
        .then(chan => chan.messages.fetch()
          .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
          .catch((error) => {
            bot.channels.cache.get(config.chan_sort).send(res)
          }))
      return message.delete()
    } else if (message.content.includes("artworks")){
      res = message.content.split("artworks/")[1].split(')')[0]
      bot.channels.fetch(config.chan_artworks)
        .then(chan => chan.messages.fetch()
          .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
          .catch((error) => {
            bot.channels.cache.get(config.chan_artworks).send(res)
          }))
      return message.delete()
    } else if (message.content.includes("users")){
      res = message.content.split("users/")[1].split(')')[0]
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
    let args = message.content.split(' ').slice(1)

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
    if(interaction.commandName === "shiren") {
      let choices = ["d2","d4","d6","d8","d10","d12","d20","d100"]
      let focusedValue = interaction.options.getFocused()
		  let filtered = choices.filter(choice => choice.startsWith(focusedValue))
		  await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })))
    }
    if(interaction.commandName === "play") {
      let choices
      const focusedOption = interaction.options.getFocused(true)

      if(focusedOption.name === "url") choices = Object.keys(bot.playlist)
      if(focusedOption.name === "shuffle") choices = ["Yes", "No"]

      let filtered = choices.filter(choice => choice.startsWith(focusedOption.value))
      await interaction.respond(filtered.map(choice => ({ name: choice.charAt(0).toUpperCase() + choice.slice(1), value: choice })))
    }

    if(interaction.commandName === "poke-judge") {
      let choices = []
      const focusedOption = interaction.options.getFocused(true)

      if(focusedOption.name === "pokémon"){
        pokemons = await bot.Pokemons.findAll({attributes: ["pokemon_nom", "pokemon_name", "pokemon_id"]})
        for(pokemon of pokemons){
          // res = `#${parseInt(pokemon.dataValues.pokemon_id)+1} - ${pokemon.dataValues.pokemon_nom} (${pokemon.dataValues.pokemon_name})`
          res = `${pokemon.dataValues.pokemon_nom} (${pokemon.dataValues.pokemon_name})`
          choices.push(res)
        }
      }
      if(focusedOption.name === "nature"){
        natures = await bot.Natures.findAll({attributes: ["nature_nom", "nature_name", "nature_incr_en", "nature_decr_en"]})
        for(nature of natures){
          res = `${nature.dataValues.nature_nom} (${nature.dataValues.nature_name})`
          // if(nature.dataValues.nature_incr_en) res += ` - ↑↑${nature.dataValues.nature_incr_en} | ↓↓${nature.dataValues.nature_decr_en}`
          choices.push(res)
        }
      }
      if(focusedOption.name.startsWith("sub-skill")){
        subskills = await bot.Subskills.findAll({attributes: ["subskill_nom", "subskill_name"]})
        for(subskill of subskills){
          res = `${subskill.dataValues.subskill_nom} (${subskill.dataValues.subskill_name})`
          choices.push(res)
        }
      }

      let filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.value.toLowerCase()))
      if(!focusedOption.value) filtered = choices
      if(filtered.length > 20) filtered = filtered.slice(0, 20)
      await interaction.respond(filtered.map(choice => ({ name: choice, value: choice.split('(')[0].slice(0, -1)})))
    }
  }

  if(interaction.type === Discord.InteractionType.ApplicationCommand) {
   let command = require(`./commands/${interaction.commandName}`)
   command.run(bot, interaction, interaction.options)
  }
})

bot.player.events.on("playerStart", (queue, track) => {
  embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setDescription(`Starting playing : **${track.title}**.`)
    .addFields({name: "Author", value: `${track.author}`})
    .addFields({name: "Duration", value: `${track.duration}`})
    .addFields({name: "Views", value: `${track.views}`})
    .setThumbnail(track.thumbnail)
    .setTimestamp()
    .setFooter({text: `Song requested by ${track.requestedBy.username}`, iconURL: `${track.requestedBy.displayAvatarURL({dynamic: true})}`})
  if(track.playlist) embed.addFields({name: "Playlist", value: `${track.playlist.title}`})

  queue.metadata.channel.send({ embeds: [embed] })
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
