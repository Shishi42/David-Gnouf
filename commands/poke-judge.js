const Discord = require("discord.js")

module.exports = {

  name: "poke-judge",
  description: "Rate your Pokémon from Pokémon Sleep",
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

    error = await check_args(bot, args)
    if(error) return message.reply({content: error, ephemeral: true})

    pokemon = await bot.Pokemons.findOne({ where: { pokemon_nom: args.get("pokémon").value}})
    nature = await bot.Natures.findOne({ where: { nature_nom: args.get("nature").value}})
    skill1 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill1").value}})
    skill2 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill2").value}})
    skill3 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill3").value}})
    skill4 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill4").value}})
    skill5 = await bot.Subskills.findOne({ where: { subskill_nom: args.get("sub-skill5").value}})

    stats_data = ["Speed of Help", "Energy Recovery", "Ingredient Finding", "Main Skill Chance", "EXP Gains"]
    nature_data = [[3,1,0,2,2],[3,1,3,2,2],[2,1,2,3,1]]
    skill_data = [[2,1,2],[0,0,0],[1,1,1],[-2,1,0],[-2,2,1],[-1,0,-1],[0,1,0],[1,2,1],[0,0,1],[1,1,2],[0,0,1],[1,1,2],[-1,-1,-1],[0,0,0],[2,2,2],[-1,-1,-1],[0,0,0],[0,0,0],[0,0,0]]
    tier_emoji = { 'S' : "<:s_:1179319618804908212>", 'A' : "<:a_:1179319609678118922>", 'B' : "<:b_:1179319611875938364>", 'C' : "<:c_:1179319613142601788>",'D' : "<:d_:1179319614447038564>", 'E' : "<:e_:1179319615915040779>", 'F' : "<:f_:1179319617542430740>", '+' : '+', '-' : '-' }

    nature_score = nature_data[parseInt(pokemon.dataValues.type_id)][stats_data.indexOf(nature.dataValues.nature_incr_en) != -1 ? stats_data.indexOf(nature.dataValues.nature_incr_en) : nature_data.length] - nature_data[parseInt(pokemon.dataValues.type_id)][stats_data.indexOf(nature.dataValues.nature_decr_en) != -1 ? stats_data.indexOf(nature.dataValues.nature_decr_en) : nature_data.length]
    skill1_score = skill_data[parseInt(skill1.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]
    skill2_score = skill_data[parseInt(skill2.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]
    skill3_score = skill_data[parseInt(skill3.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]
    skill4_score = skill_data[parseInt(skill4.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]
    skill5_score = skill_data[parseInt(skill5.dataValues.subskill_id)][parseInt(pokemon.dataValues.type_id)]

    total_score = nature_score + skill1_score + skill2_score + skill3_score + skill4_score + skill5_score
    skill = await bot.Skills.findOne({ where: { skill_id: pokemon.dataValues.skill_id}})
    nature_stats = nature.dataValues.nature_incr_en ? `:arrow_up: ${nature.dataValues.nature_incr_fr} :arrow_down: ${nature.dataValues.nature_decr_fr}` : ":arrow_up: Aucun :arrow_down: Aucun"
    type = await bot.Types.findOne({ where: { type_id: pokemon.dataValues.type_id}})

    response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.dataValues.pokemon_name.toLowerCase()}`)
    poke = await response.json()

    let embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`[${pokemon.dataValues.pokemon_tier.split('').map(char => `${tier_emoji[char]}`).join('')}] ${pokemon.dataValues.pokemon_nom} (${type.dataValues.type_nom})`)
      .setDescription(`:star: **${skill.dataValues.skill_nom}**\nEARLY : ${rating(skill.dataValues.skill_tier_early)} • LATE : ${rating(skill.dataValues.skill_tier_late)}`)
      .setAuthor({ name: "Pokémon Sleep Rating System", iconURL: "https://pbs.twimg.com/profile_images/1630213009732952065/5GdGZqse_400x400.jpg", url: "https://twitter.com/PokemonSleep" })
      .setThumbnail(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${poke.id}.png`)
      .addFields(
    		{ name: `:slight_smile: ${nature.dataValues.nature_nom} - ${nature_stats}`, value: `${rating(nature_score)}`},
    		{ name: `:star: ${skill1.dataValues.subskill_nom}`, value: `${rating(skill1_score)}`},
        { name: `:star: ${skill2.dataValues.subskill_nom}`, value: `${rating(skill2_score)}`},
        { name: `:star: ${skill3.dataValues.subskill_nom}`, value: `${rating(skill3_score)}`},
        { name: `:star: ${skill4.dataValues.subskill_nom}`, value: `${rating(skill4_score)}`},
        { name: `:star: ${skill5.dataValues.subskill_nom}`, value: `${rating(skill5_score)}`},
        { name: '\u200B', value: '\u200B' },
        { name: `:trophy: SCORE TOTAL :trophy:`, value: `**${total_score} :arrow_right: ${total_rating(total_score)}**`},
    	)
      .setTimestamp()
      .setFooter({text: `Requested by ${message.user.username}`, iconURL: `${message.user.displayAvatarURL({dynamic: true})}`})

    await message.reply({embeds: [embed]})

    function rating(string){
      return ["TRASH","BAD","WEAK","OKAY","GOOD","GREAT","GOD"][parseInt(string)+3]
    }

    function total_rating(string){
      return ["TRASH","TRASH","TRASH","TRASH","TRASH","TRASH","VERY BAD","VERY BAD","VERY BAD","BAD","BAD","BAD","MEH","MEH","MEH","GOOD","GOOD","GOOD","VERY GOOD","VERY GOOD","VERY GOOD","GOD","GOD","GOD","GOD","GOD","GOD"][parseInt(string)+13]
    }


    async function check_args(bot, args){
      error = ""
      choices = []
      pokemons = await bot.Pokemons.findAll({attributes: ["pokemon_nom", "pokemon_name", "pokemon_id"]})
      for(pokemon of pokemons){
        choices.push(`${pokemon.dataValues.pokemon_nom} (${pokemon.dataValues.pokemon_name})`)
        choices.push(pokemon.dataValues.pokemon_nom)
        choices.push(pokemon.dataValues.pokemon_name)
        choices.push(parseInt(pokemon.dataValues.pokemon_id)+1)
      }
      if(!choices.includes(args.get("pokémon").value)) error += "The Pokémon you provided is invalid.\n"

      choices = []
      natures = await bot.Natures.findAll({attributes: ["nature_nom", "nature_name", "nature_incr_en", "nature_decr_en"]})
      for(nature of natures){
        choices.push(`${nature.dataValues.nature_nom} (${nature.dataValues.nature_name})`)
        choices.push(nature.dataValues.nature_nom)
        choices.push(nature.dataValues.nature_name)
      }
      if(!choices.includes(args.get("nature").value)) error += "The nature you provided is invalid.\n"

      choices = []
      subskills = await bot.Subskills.findAll({attributes: ["subskill_nom", "subskill_name"]})
      for(subskill of subskills){
        choices.push(`${subskill.dataValues.subskill_nom} (${subskill.dataValues.subskill_name})`)
        choices.push(subskill.dataValues.subskill_nom)
        choices.push(subskill.dataValues.subskill_name)
      }
      if(!choices.includes(args.get("sub-skill1").value)) error += "The 1st sub-skill (lvl10) you provided is invalid.\n"
      if(!choices.includes(args.get("sub-skill2").value)) error += "The 2nd sub-skill (lvl25) you provided is invalid.\n"
      if(!choices.includes(args.get("sub-skill3").value)) error += "The 3rd sub-skill (lvl50) you provided is invalid.\n"
      if(!choices.includes(args.get("sub-skill4").value)) error += "The 4th sub-skill (lvl75) you provided is invalid.\n"
      if(!choices.includes(args.get("sub-skill5").value)) error += "The 5th sub-skill (lvl100) you provided is invalid.\n"

      return error
    }
  }
}
