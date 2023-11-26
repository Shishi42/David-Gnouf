const Discord = require("discord.js")

module.exports = {

  name: "poke-judge",
  description: "Rate your Pokémon from Pokémon Sleep, from Trash to God tier",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "pokémon",
      description: "The name of the pokémon",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "nature",
      description: "The nature of the pokémon",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "sub-skill1",
      description: "The 1st sub-skill (lvl10) of the pokémon",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "sub-skill2",
      description: "The 2nd sub-skill (lvl25) of the pokémon",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "sub-skill3",
      description: "The 3rd sub-skill (lvl50) of the pokémon",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "sub-skill4",
      description: "The 4th sub-skill (lvl75) of the pokémon",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "sub-skill5",
      description: "The 5th sub-skill (lvl100) of the pokémon",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, message, args) {

    error = ""
    choices = []
    pokemons = await bot.Pokemons.findAll({attributes: ["pokemon_nom", "pokemon_name", "pokemon_id"]})
    for(pokemon of pokemons){
      res = `#${parseInt(pokemon.dataValues.pokemon_id)+1} - ${pokemon.dataValues.pokemon_nom} (${pokemon.dataValues.pokemon_name})`
      choices.push(res)
      choices.push(pokemon.dataValues.pokemon_nom)
      choices.push(pokemon.dataValues.pokemon_name)
      choices.push(parseInt(pokemon.dataValues.pokemon_id)+1)
    }
    if(!choices.includes(args.get("pokémon").value)) error += "The Pokémon you provided is invalid.\n"

    choices = []
    natures = await bot.Natures.findAll({attributes: ["nature_nom", "nature_name", "nature_incr_en", "nature_decr_en"]})
    for(nature of natures){
      res = `${nature.dataValues.nature_nom} (${nature.dataValues.nature_name})`
      if(nature.dataValues.nature_incr_en) res += ` - ↑↑${nature.dataValues.nature_incr_en} | ↓↓${nature.dataValues.nature_decr_en}`
      choices.push(res)
      choices.push(nature.dataValues.nature_nom)
      choices.push(nature.dataValues.nature_name)
    }
    if(!choices.includes(args.get("nature").value)) error += "The nature you provided is invalid.\n"

    choices = []
    subskills = await bot.Subskills.findAll({attributes: ["subskill_nom", "subskill_name"]})
    for(subskill of subskills){
      res = `${subskill.dataValues.subskill_nom} (${subskill.dataValues.subskill_name})`
      choices.push(res)
      choices.push(subskill.dataValues.subskill_nom)
      choices.push(subskill.dataValues.subskill_name)
    }
    if(!choices.includes(args.get("sub-skill1").value)) error += "The 1st sub-skill (lvl10) you provided is invalid.\n"
    if(!choices.includes(args.get("sub-skill2").value)) error += "The 2nd sub-skill (lvl25) you provided is invalid.\n"
    if(!choices.includes(args.get("sub-skill3").value)) error += "The 3rd sub-skill (lvl50) you provided is invalid.\n"
    if(!choices.includes(args.get("sub-skill4").value)) error += "The 4th sub-skill (lvl75) you provided is invalid.\n"
    if(!choices.includes(args.get("sub-skill5").value)) error += "The 5th sub-skill (lvl100) you provided is invalid.\n"
    if(error) return message.reply({content: error, ephemeral: true})

    pokemon = await bot.Pokemons.findOne({ where: { pokemon_nom: args.get("pokémon").value.split(' ')[2]}})
    nature = await bot.Natures.findOne({ where: { nature_nom: args.get("nature").value.split(' ')[0]}})

    skill1 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill1").value.split('(')[0].slice(0, -1)}})
    skill2 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill2").value.split('(')[0].slice(0, -1)}})
    skill3 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill3").value.split('(')[0].slice(0, -1)}})
    skill4 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill4").value.split('(')[0].slice(0, -1)}})
    skill5 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill5").value.split('(')[0].slice(0, -1)}})

    stats_data = ["Speed of Help", "Energy Recovery", "Ingredient Finding", "Main Skill Chance", "EXP Gains"]
    nature_data = [[3,1,0,2,2,0],[3,1,3,2,2,0],[2,1,2,3,1,0]]
    skill_data = [[2,1,2],[0,0,0],[1,1,1],[-2,1,0],[-2,2,1],[-1,0,-1],[0,1,0],[1,2,1],[0,0,1],[1,1,2],[0,0,1],[1,1,2],[-1,-1,-1],[0,0,0],[2,2,2],[-1,-1,-1],[0,0,0]]

    nature_score = nature_data[parseInt(pokemon.dataValues.type_id)][stats_data.indexOf(nature.dataValues.nature_incr_en) != -1 ? stats_data.indexOf(nature.dataValues.nature_incr_en) : nature_data.length] - nature_data[parseInt(pokemon.dataValues.type_id)][stats_data.indexOf(nature.dataValues.nature_decr_en) != -1 ? stats_data.indexOf(nature.dataValues.nature_decr_en) : nature_data.length]
    skill1_score = skill_data[parseInt(skill1.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]
    skill2_score = skill_data[parseInt(skill2.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]
    skill3_score = skill_data[parseInt(skill3.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]
    skill4_score = skill_data[parseInt(skill4.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]
    skill5_score = skill_data[parseInt(skill5.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]

    total_score = nature_score + skill1_score + skill2_score + skill3_score + skill4_score + skill5_score
    skill = await bot.Skills.findOne({ where: { skill_id: pokemon.dataValues.skill_id}})
    nature_stats = nature.dataValues.nature_incr_en ? `↑↑${nature.dataValues.nature_incr_fr}  |  ↓↓${nature.dataValues.nature_decr_fr}` : "↑↑Aucun  |  ↓↓Aucun"
    type = await bot.Types.findOne({ where: { type_id: pokemon.dataValues.type_id}})

    response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.dataValues.pokemon_name.toLowerCase()}`)
    poke = await response.json()

    if(parseInt(total_score) <= -8) rate = "TRASH :wastebasket:"
    else if(parseInt(total_score) <= -5) rate = "VERY BAD"
    else if(parseInt(total_score) <= -3) rate = "BAD"
    if(parseInt(total_score) >= 8) rate = "GOD :angel:"
    else if(parseInt(total_score) >= 5) rate = "VERY GOOD"
    else if(parseInt(total_score) >= 3) rate = "GOOD"
    else rate = "MEH :upside_down:"

    let embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`:red_circle: ${pokemon.dataValues.pokemon_nom} (${type.dataValues.type_nom}) | ${pokemon.dataValues.pokemon_tier}`)
      .setDescription(`:star: ${skill.dataValues.skill_nom}\nEARLY : **${rating(skill.dataValues.skill_tier_early)}** | LATE : **${rating(skill.dataValues.skill_tier_late)}**`)
      .setAuthor({ name: "Pokémon Sleep Rating System", iconURL: "https://pbs.twimg.com/profile_images/1630213009732952065/5GdGZqse_400x400.jpg", url: "https://twitter.com/PokemonSleep" })
      .setThumbnail(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${poke.id}.png`)
      .addFields(
    		{ name: `:slight_smile: ${nature.dataValues.nature_nom} - ${nature_stats}`, value: `${rating(nature_score)}`},
    		{ name: `:star: ${skill1.dataValues.subskill_nom}`, value: `${rating(skill1_score)}`, inline: true },
        { name: `:star: ${skill2.dataValues.subskill_nom}`, value: `${rating(skill2_score)}`, inline: true },
        { name: `:star: ${skill3.dataValues.subskill_nom}`, value: `${rating(skill3_score)}`, inline: true },
        { name: `:star: ${skill4.dataValues.subskill_nom}`, value: `${rating(skill4_score)}`, inline: true },
        { name: `:star: ${skill5.dataValues.subskill_nom}`, value: `${rating(skill5_score)}`, inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: `:trophy: SCORE TOTAL :trophy:`, value: `**${total_score} :arrow_right: ${rate}**`},
    	)
      .setTimestamp()
      .setFooter({text: `Requested by ${message.user.username}`, iconURL: `${message.user.displayAvatarURL({dynamic: true})}`})

    await message.reply({embeds: [embed]})

    function rating(string){
      return ["TRASH","BAD","WEAK","OKAY","GOOD","GREAT","GOD"][parseInt(string)+3]
    }
  }
}
