const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

    let entry = interaction.options.getFocused()

    if(interaction.commandName === "help") {
      let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
      const focusedOption = interaction.options.getFocused(true)

      console.log(choices)

      let filtered = choices.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()))
      if(!focusedOption.value) filtered = choices
      console.log(filtered)
      console.log(filtered.length)
      if(filtered.length > 20) filtered = filtered.slice(0, 20)

      await interaction.respond(filtered.map(choice => ({ name: choice.name, value: choice.name })))
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

      let filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.value.toLowerCase()))
      if(!focusedOption.value) filtered = choices
      if(filtered.length > 20) filtered = filtered.slice(0, 20)
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

  if(interaction.type === Discord.InteractionType.MessageComponent && interaction.isButton()) {
    if(interaction.customId === 'playpause') require(`../commands/pause.js`).run(bot, interaction)
    if(interaction.customId === 'skip') require(`../commands/skip.js`).run(bot, interaction)
    if(interaction.customId === 'queue') require(`../commands/queue.js`).run(bot, interaction)
    if(interaction.customId === 'leave') require(`../commands/end.js`).run(bot, interaction)
    if(interaction.customId === 'logs'){
      bot.player_logs = !bot.player_logs
      await interaction.reply(`Player logs is now **${bot.player_logs ? "on" : "off"}**.`)
    }
  }

  if(interaction.type === Discord.InteractionType.MessageComponent && interaction.isAnySelectMenu()) {
    if(interaction.customId === 'channel'){
      bot.distant_channel = interaction.values[0]
      // await interaction.reply({content : `Distant channel is now ${bot.channels.cache.get(bot.distant_channel)}.`, ephemeral : !bot.player_logs})
    }
    if(interaction.customId.includes('song')) require(`../commands/play.js`).run(bot, interaction, {url : interaction.values, source : "dj"})
  }

  if(interaction.type === Discord.InteractionType.ApplicationCommand) {
   let command = require(`../commands/${interaction.commandName}`)
   command.run(bot, interaction, interaction.options)
  }
}
