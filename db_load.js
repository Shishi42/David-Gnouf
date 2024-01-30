const Discord = require("discord.js")

module.exports = {

  async run(bot) {

    skills = [
      ["Dream Shard Magnet S","Aimant à Fragment de Rêve S","-2","-2"],
      ["Dream Shard Magnet S - Var","Aimant à Fragment de Rêve S - Var","-2","-2"],
      ["Ingredient Magnet S","Aiment à Ingrédient S","1","0"],
      ["Charge Energy S","Charge d'Énergies S","0","1"],
      ["Charge Strength M","Charge de Puissance M","1","1"],
      ["Charge Strength S","Charge de Puissance S","-1","-1"],
      ["Charge Strength S - Var","Charge de Puissance S - Var","0","0"],
      ["Energizing Cheer S","Encouragement Énergique S","-1","0"],
      ["Energy for Everyone S","Énergie Partagée S","2","2"],
      ["Cooking Power-Up S","Garde-Manger S","-1","1"],
      ["Metronome","Métronome","0","0"],
      ["Extra Helpful S","Soutien Extra S","-1","-1"]
    ]

    subskills = [
      ["Berry Finding S","Fan de Baies S"],
      ["Helping Speed S","Soutien Rapide S"],
      ["Helping Speed M","Soutien Rapide M"],
      ["Ingredient Finder S","Ingrédients + S"],
      ["Ingredient Finder M","Ingrédients + M"],
      ["Inventory Up S","Inventaire + S"],
      ["Inventory Up M","Inventaire + M"],
      ["Inventory Up L","Inventaire + L"],
      ["Skill Level Up S","Niveau Compétence + S"],
      ["Skill Level Up M","Niveau Compétence + M"],
      ["Skill Trigger S","Compétence + S"],
      ["Skill Trigger M","Compétence + M"],
      ["Dream Shard Bonus","Bonus Fragment de Rêve"],
      ["Energy Recovery Bonus","Bonus Récup'Énergie"],
      ["Helping Bonus","Bonus Soutien"],
      ["Research EXP Bonus","Bonus Point de recherche"],
      ["Sleep EXP Bonus","Bonus Dodo"],
      ["Energy Recovery S","Récup'Énergie + S"],
      ["Energy Recovery M","Récup'Énergie + M"]
    ]

    natures = [
      ["Assuré","Bold","Energy Recovery,Speed of Help","Récup. Énergie,Vitesse Soutien"],
      ["Bizarre","Quirky","",""],
      ["Brave","Brave","Speed of Help,EXP Gains","Vitesse Soutien,EXP Obtenue"],
      ["Calme","Calm","Main Skill Chance,Speed of Help","% Comp.,Vitesse Soutien"],
      ["Discret","Quiet","Ingredient Finding,EXP Gains","% Ingrédients,EXP Obtenue"],
      ["Docile","Docile","",""],
      ["Doux","Mild","Ingredient Finding,Energy Recovery","% Ingrédients,Récup. Énergie"],
      ["Foufou","Rash","Ingredient Finding,Main Skill Chance","% Ingrédients,% Comp."],
      ["Gentil","Gentle","Main Skill Chance,Energy Recovery","% Comp.,Récup. Énergie"],
      ["Hardi","Hardy","",""],
      ["Jovial","Jolly","EXP Gains,Ingredient Finding","EXP Obtenue,% Ingrédients"],
      ["Lâche","Lax","Energy Recovery,Main Skill Chance","Récup. Énergie,% Comp."],
      ["Malin","Impish","Energy Recovery,Ingredient Finding","Récup. Énergie,% Ingrédients"],
      ["Malpoli","Sassy","Main Skill Chance,EXP Gains","% Comp.,EXP Obtenue"],
      ["Mauvais","Naughty","Speed of Help,Main Skill Chance","Vitesse Soutien,% Comp."],
      ["Modeste","Modest","Ingredient Finding,Speed of Help","% Ingrédients,Vitesse Soutien"],
      ["Naïf","Naive","EXP Gains,Main Skill Chance","EXP Obtenue,% Comp."],
      ["Pressé","Hasty","EXP Gains,Energy Recovery","EXP Obtenue,Récup. Énergie"],
      ["Prudent","Careful","Main Skill Chance,Ingredient Finding","% Comp.,% Ingrédients"],
      ["Pudique","Bashful","",""],
      ["Relax","Relaxed","Energy Recovery,EXP Gains","Récup. Énergie,EXP Obtenue"],
      ["Rigide","Adamant","Speed of Help,Ingredient Finding","Vitesse Soutien,% Ingrédients"],
      ["Sérieux","Serious","",""],
      ["Solo","Lonely","Speed of Help,Energy Recovery","Vitesse Soutien,Récup. Énergie"],
      ["Timide","Timid","EXP Gains,Speed of Help","EXP Obtenue,Vitesse Soutien"]
    ]

    types = [
      ["Berries","Baies"],
      ["Ingredients","Ingrédients"],
      ["Skills","Compétences"]
    ]

    pokemons = [
      ["Bulbizarre","Ingrédients","Aiment à Ingrédient S","C+"],
      ["Herbizarre","Ingrédients","Aiment à Ingrédient S","B"],
      ["Florizarre","Ingrédients","Aiment à Ingrédient S","A-"],
      ["Salamèche","Ingrédients","Aiment à Ingrédient S","B-"],
      ["Reptincel","Ingrédients","Aiment à Ingrédient S","B+"],
      ["Dracaufeu","Ingrédients","Aiment à Ingrédient S","A+"],
      ["Carapuce","Ingrédients","Aiment à Ingrédient S","C+"],
      ["Carabaffe","Ingrédients","Aiment à Ingrédient S","B"],
      ["Tortank","Ingrédients","Aiment à Ingrédient S","A-"],
      ["Chenipan","Baies","Aiment à Ingrédient S","C+"],
      ["Chrysacier","Baies","Aiment à Ingrédient S","B-"],
      ["Papilusion","Baies","Aiment à Ingrédient S","S-"],
      ["Rattata","Baies","Charge d'Énergies S","C"],
      ["Rattatac","Baies","Charge d'Énergies S","A-"],
      ["Abo","Baies","Charge d'Énergies S","C"],
      ["Arbok","Baies","Charge d'Énergies S","B"],
      ["Pichu","Baies","Charge de Puissance S","C+"],
      ["Pikachu","Baies","Charge de Puissance S","A"],
      ["Raichu","Baies","Charge de Puissance S","S+"],
      ["Mélo","Baies","Métronome","C-"],
      ["Mélofée","Baies","Métronome","B-"],
      ["Mélodelfe","Baies","Métronome","A"],
      ["Toudoudou","Compétences","Énergie Partagée S","C-"],
      ["Rondoudou","Compétences","Énergie Partagée S","B-"],
      ["Grodoudou","Compétences","Énergie Partagée S","S"],
      ["Taupiqueur","Ingrédients","Charge de Puissance S","C+"],
      ["Triopikeur","Ingrédients","Charge de Puissance S","A"],
      ["Miaouss","Compétences","Aimant à Fragment de Rêve S","F"],
      ["Persian","Compétences","Aimant à Fragment de Rêve S","B"],
      ["Psykokwak","Compétences","Charge de Puissance S - Var","F"],
      ["Akwakwak","Compétences","Charge de Puissance S - Var","B"],
      ["Férosinge","Baies","Charge de Puissance S - Var","B-"],
      ["Colossinge","Baies","Charge de Puissance S - Var","A"],
      ["Caninos","Compétences","Soutien Extra S","C"],
      ["Arcanin","Compétences","Soutien Extra S","A"],
      ["Chétiflor","Ingrédients","Charge d'Énergies S","C-"],
      ["Boustiflor","Ingrédients","Charge d'Énergies S","B-"],
      ["Empiflor","Ingrédients","Charge d'Énergies S","A"],
      ["Racaillou","Ingrédients","Charge de Puissance S - Var","F"],
      ["Gravalanch","Ingrédients","Charge de Puissance S - Var","B-"],
      ["Grolem","Ingrédients","Charge de Puissance S - Var","B+"],
      ["Ramoloss","Compétences","Encouragement Énergique S","F"],
      ["Flagadoss","Compétences","Encouragement Énergique S","B+"],
      ["Roigada","Compétences","Encouragement Énergique S","A-"],
      ["Magnéti","Compétences","Garde-Manger S","F"],
      ["Magnéton","Compétences","Garde-Manger S","B-"],
      ["Magnézone","Compétences","Garde-Manger S","A"],
      ["Doduo","Baies","Charge d'Énergies S","B"],
      ["Dodrio","Baies","Charge d'Énergies S","S+"],
      ["Fantominus","Ingrédients","Charge de Puissance S - Var","B"],
      ["Spectrum","Ingrédients","Charge de Puissance S - Var","A"],
      ["Ectoplasma","Ingrédients","Charge de Puissance S - Var","S+"],
      ["Onix","Baies","Aiment à Ingrédient S","A-"],
      ["Steelix","Baies","Aiment à Ingrédient S","A"],
      ["Osselait","Baies","Charge d'Énergies S","C"],
      ["Ossatueur","Baies","Charge d'Énergies S","B+"],
      ["Kangourex","Ingrédients","Aiment à Ingrédient S","A-"],
      ["Mime Jr.","Ingrédients","Charge de Puissance S","C+"],
      ["M. Mime","Ingrédients","Charge de Puissance S","A"],
      ["Scarabrute","Ingrédients","Charge de Puissance S","A"],
      ["Métamorph","Ingrédients","Charge de Puissance S","A"],
      ["Évoli","Compétences","Aiment à Ingrédient S","C"],
      ["Aquali","Compétences","Aiment à Ingrédient S","B"],
      ["Voltali","Compétences","Soutien Extra S","A"],
      ["Pyroli","Compétences","Garde-Manger S","S-"],
      ["Mentali","Compétences","Charge de Puissance M","S-"],
      ["Noctali","Compétences","Charge d'Énergies S","B-"],
      ["Phyllali","Compétences","Encouragement Énergique S","B"],
      ["Givrali","Compétences","Garde-Manger S","B+"],
      ["Nymphali","Compétences","Énergie Partagée S","S-"],
      ["Germignon","Baies","Charge de Puissance S - Var","B-"],
      ["Macronium","Baies","Charge de Puissance S - Var","B+"],
      ["Méganium","Baies","Charge de Puissance S - Var","A+"],
      ["Héricendre","Baies","Charge de Puissance S - Var","B"],
      ["Feurisson","Baies","Charge de Puissance S - Var","A-"],
      ["Typhlosion","Baies","Charge de Puissance S - Var","S"],
      ["Kaiminus","Baies","Charge de Puissance S - Var","C+"],
      ["Crocrodil","Baies","Charge de Puissance S - Var","B"],
      ["Aligatueur","Baies","Charge de Puissance S - Var","A"],
      ["Togepi","Compétences","Métronome","C-"],
      ["Togetic","Compétences","Métronome","C+"],
      ["Togekiss","Compétences","Métronome","A-"],
      ["Wattouat","Compétences","Charge de Puissance M","C+"],
      ["Lainergie","Compétences","Charge de Puissance M","B+"],
      ["Pharamp","Compétences","Charge de Puissance M","S"],
      ["Manzaï","Compétences","Charge de Puissance M","F"],
      ["Simularbre","Compétences","Charge de Puissance M","B-"],
      ["Okéoké","Compétences","Encouragement Énergique S","F"],
      ["Qulbutoké","Compétences","Encouragement Énergique S","B-"],
      ["Scarhino","Compétences","Aiment à Ingrédient S","A-"],
      ["Malosse","Baies","Charge de Puissance S","C"],
      ["Démolosse","Baies","Charge de Puissance S","B+"],
      ["Embrylex","Ingrédients","Charge d'Énergies S","C"],
      ["Ymphect","Ingrédients","Charge d'Énergies S","B-"],
      ["Tyranocif","Ingrédients","Charge d'Énergies S","A+"],
      ["Parecool","Baies","Aiment à Ingrédient S","C"],
      ["Vigoroth","Baies","Aiment à Ingrédient S","A-"],
      ["Monaflèmit","Baies","Aiment à Ingrédient S","A-"],
      ["Ténéfix","Compétences","Aimant à Fragment de Rêve S - Var","C+"],
      ["Gloupti","Compétences","Aimant à Fragment de Rêve S - Var","F"],
      ["Avaltout","Compétences","Aimant à Fragment de Rêve S - Var","C+"],
      ["Tylton","Baies","Charge d'Énergies S","B-"],
      ["Altaria","Baies","Charge d'Énergies S","B+"],
      ["Polichombr","Baies","Charge de Puissance S","B-"],
      ["Branette","Baies","Charge de Puissance S","S-"],
      ["Absol","Ingrédients","Charge de Puissance S","S-"],
      ["Obalie","Baies","Aiment à Ingrédient S","C-"],
      ["Phogleur","Baies","Aiment à Ingrédient S","B-"],
      ["Kaimorse","Baies","Aiment à Ingrédient S","A"],
      ["Riolu","Compétences","Aimant à Fragment de Rêve S","C"],
      ["Lucario","Compétences","Aimant à Fragment de Rêve S","B+"],
      ["Cradopaud","Ingrédients","Charge de Puissance S","C-"],
      ["Coatox","Ingrédients","Charge de Puissance S","B+"],
      ["Pikachu - Halloween","Baies","Charge de Puissance S - Var","?"],
      ["Pikachu - Noël","Compétences","Aimant à Fragment de Rêve S","?"],
      ["Cadoizo","Ingrédients","Aiment à Ingrédient S","?"],      
      ["Blizzi","Ingrédients","Charge de Puissance S - Var","?"],
      ["Blizzaroi","Ingrédients","Charge de Puissance S - Var","?"],
      ["Minidraco","Ingrédients","Charge d'Énergies S","?"],
      ["Draco","Ingrédients","Charge d'Énergies S","?"],
      ["Dracolosse","Ingrédients","Charge d'Énergies S","?"],
      ["Tarsal","Compétences","Énergie Partagée S","?"],
      ["Kirlia","Compétences","Énergie Partagée S","?"],
      ["Gardevoir","Compétences","Énergie Partagée S","?"],
      ["Gallame","Compétences","Soutien Extra S","?"],
      ["Nounourson","Ingrédients","Charge de Puissance S - Var","?"],
      ["Chelours","Ingrédients","Charge de Puissance S - Var","?"],
    ]

    pokemon_english = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Rattata","Raticate","Ekans","Arbok","Pichu","Pikachu","Raichu","Cleffa","Clefairy","Clefable","Igglybuff","Jigglypuff","Wigglytuff","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Bellsprout","Weepinbell","Victreebel","Geodude","Graveler","Golem","Slowpoke","Slowbro","Slowking","Magnemite","Magneton","Magnezone","Doduo","Dodrio","Gastly","Haunter","Gengar","Onix","Steelix","Cubone","Marowak","Kangaskhan","Mime Jr.","Mr. Mime","Pinsir","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Espeon","Umbreon","Leafeon","Glaceon","Sylveon","Chikorita","Bayleef","Meganium","Cyndaquil","Quilava","Typhlosion","Totodile","Croconaw","Feraligatr","Togepi","Togetic","Togekiss","Mareep","Flaaffy","Ampharos","Bonsly","Sudowoodo","Wynaut","Wobbuffet","Heracross","Houndour","Houndoom","Larvitar","Pupitar","Tyranitar","Slakoth","Vigoroth","Slaking","Sableye","Gulpin","Swalot","Swablu","Altaria","Shuppet","Banette","Absol","Spheal","Sealeo","Walrein","Riolu","Lucario","Croagunk","Toxicroak","Pikachu - Halloween","Pikachu - Christmas","Delibird","Snover","Abomasnow","Dratini","Dragonair","Dragonite","Ralts","Kirlia","Gardevoir","Gallade","Stufful","Bewear"]

    skills.forEach((skill, i) => {
      bot.Skills.create({
        skill_id: i,
        skill_nom: skill[1],
        skill_name: skill[0],
        skill_tier_early: skill[2],
        skill_tier_late: skill[3],
      })
    })

    subskills.forEach((subskill, i) => {
      bot.Subskills.create({
        subskill_id: i,
        subskill_nom: subskill[1],
        subskill_name: subskill[0],
      })
    })

    natures.forEach((nature, i) => {

      if(nature[2] == ""){
        fr = ["",""]
        en = ["",""]
      } else {
        fr = nature[3].split(',')
        en = nature[2].split(',')
      }

      bot.Natures.create({
        nature_id: i,
        nature_nom: nature[0],
        nature_name: nature[1],
        nature_incr_fr: fr[0],
        nature_incr_en: en[0],
        nature_decr_fr: fr[1],
        nature_decr_en: en[1],
      })
    })

    types.forEach((type, i) => {
      bot.Types.create({
        type_id: i,
        type_nom: type[1],
        type_name: type[0],
      })
    })

    pokemons.forEach((pokemon, i) => {

      type_id = types.findIndex(x => x.includes(pokemon[1]))
      skill_id = skills.findIndex(x => x.includes(pokemon[2]))

      bot.Pokemons.create({
        pokemon_id: i,
        pokemon_nom: pokemon[0],
        pokemon_name: pokemon_english[i],
        type_id: type_id,
        skill_id: skill_id,
        pokemon_tier: pokemon[3],
      })
    })
  }
}
