const Discord = require("discord.js")

module.exports = async (bot, interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

    let choices = []
    const focusedOption = interaction.options.getFocused(true)

    if(interaction.commandName === "help") { choices = bot.commands.map(cmd => cmd.name) }
    if(interaction.commandName === "shiren") { choices = ["d2","d4","d6","d8","d10","d12","d20","d100"] }
    if(interaction.commandName === "play") {
      if(focusedOption.name === "url") choices = Object.keys(bot.playlist)
      if(focusedOption.name === "shuffle") choices = ["Yes", "No"]
    }
    if(interaction.commandName === "poke-judge") {
      if(focusedOption.name === "pokémon"){
        pokemons = await bot.Pokemons.findAll({attributes: ["pokemon_nom", "pokemon_name", "pokemon_id"]})
        pokemons.map((pokemon) => choices.push(`${pokemon.dataValues.pokemon_nom} (${pokemon.dataValues.pokemon_name})`))
      }
      if(focusedOption.name === "nature"){
        natures = await bot.Natures.findAll({attributes: ["nature_nom", "nature_name", "nature_incr_en", "nature_decr_en"]})
        natures.map((nature) => choices.push(`${nature.dataValues.nature_nom} (${nature.dataValues.nature_name})`))
      }
      if(focusedOption.name.startsWith("sub-skill")){
        subskills = await bot.Subskills.findAll({attributes: ["subskill_nom", "subskill_name"]})
        subskills.map((subskill) => choices.push(`${subskill.dataValues.subskill_nom} (${subskill.dataValues.subskill_name})`))
      }
    }

    let filtered = choices.filter(choice => choice.toLowerCase().includes(focusedOption.value.toLowerCase()))
    if(!focusedOption.value) filtered = choices
    if(filtered.length > 20) filtered = filtered.slice(0, 20)
    if(interaction.commandName !== "poke-judge") await interaction.respond(filtered.map(choice => ({ name: choice, value: choice })))
    else await interaction.respond(filtered.map(choice => ({ name: choice, value: choice.split('(')[0].slice(0, -1)})))
  }

  if(interaction.type === Discord.InteractionType.MessageComponent) {
    if(interaction.customId === 'playpause') require(`../commands/pause.js`).run(bot, interaction, "dj")
    if(interaction.customId === 'skip') require(`../commands/skip.js`).run(bot, interaction, "dj")
    if(interaction.customId === 'queue') require(`../commands/queue.js`).run(bot, interaction, "dj")
    if(interaction.customId === 'leave') require(`../commands/end.js`).run(bot, interaction, "dj")
    if(interaction.customId.includes('song')) require(`../commands/play.js`).run(bot, interaction, {url : interaction.values, source : "dj"})
  }

  if(interaction.type === Discord.InteractionType.ApplicationCommand) { require(`../commands/${interaction.commandName}`).run(bot, interaction, interaction.options) }
}
