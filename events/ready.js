const Sequelize = require("sequelize")
const slashcommands_loader = require("../slashcommands_loader")
const fs = require("fs")

module.exports = async bot => {

  console.log(`Connected as ${bot.user.tag}!`)

  bot.playlist = {

    "boss" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHlA4Nu4iV5qaepkJtCGpvum",
    "boss (Shishi)" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRYAaMLlPantdH2NETdusfPB",
    "combat" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHnppAcv5h-AmBdIDbzeAcdl",
    "combat (Shishi)" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRYMyc89UTRNZv8ykVjZgSIo",
    "exploration" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHkprT_od00SyPW8Sk21-CDd",
    "donjon" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHl771DkODYxiA2GOaKO9a34",
    "donjon (Shishi)" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRYpDQ1EV0fGPvpaipR_N4kc",
    "taverne" : "https://www.youtube.com/playlist?list=PLjZ9bFeB3tHl7q5_z18NKdso8jiDRNYex",
    "ville (Shishi)" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRaHpBqAqDNJXNI5ZGnwIZ_G",
  
    "clamerde" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRb9RjeiWwQZ9UbHsV-AnasY",
    "ilécon" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRYLfQD-5gRohATO1_NhcUnK",
    "trofor" : "https://www.youtube.com/playlist?list=PLpzykkaTpoRZwLdVUVcjilOwhOEnvLDbe",
  
    "[A,B,F,P,R,Y] Routes" : "https://youtu.be/9G6CskLxgMI",
    "[C] Le bois de Svalich" : "https://youtu.be/eePl-I8heFc",
    "[D,H,L] Cours d'eaux" : "https://youtu.be/4W2EfqdOmiI",
    "[E] Village de Barovie" : "https://youtu.be/nnEGIH1mXwI",
    "[E] Village de Barovie - Funeste demeure" : "https://youtu.be/GOTyzCntzJo",
    "[E] Village de Barovie - Donjon de la Funeste demeure" : "https://youtu.be/eqUiXz1tcmM",
    "[G] Campement du bief de Tser" : "https://youtu.be/7KFoj-SOfHs",
    "[I,J,K] Ravenloft" : "https://youtu.be/rfA-pzDkERs",
    "[K] Le château de Ravenloft - Catacombes" : "https://youtu.be/WPpVMmTt74Q",
    "[M] Le Mage Fou du Mont Baratok" : "https://youtu.be/dHRcgk7MBHw",
    "[N] La ville de Vallaki" : "https://youtu.be/2UPkwe_5p_w",
    "[O] Le moulin d'Esquilles" : "https://youtu.be/J63qJ_GFV_k",
    "[Q] Argynvostholt" : "https://youtu.be/K08IQhgXDWQ",
    "[S] Krezk" : "https://youtu.be/ZRnLm7BJMnw",
    "[S] Krezk - Abbaye Sainte Markovia" : "https://youtu.be/8AODR94oNMo",
    "[S] Krezk - Madhouse" : "https://youtu.be/1gDfJHT5n0U",
    "[T] La passe de Tsolenka" : "https://youtu.be/L_eIOeXIEfo",
    "[U] Les ruines de Bérez" : "https://youtu.be/9MsH9vN1aFQ",
    "[V] La Tour de Van Richten" : "https://youtu.be/1u7rJTtlbKw",
    "[W] Le Magicien des Vins" : "https://youtu.be/4hT8zvR-nkg",
    "[X] Le Temple d'Ambre" : "https://youtu.be/Dd91LPwFAMk",
    "[Z] La tanière des loups-garous" : "https://youtu.be/128kAIlwh4g",
    "[?] Les brumes de Ravenloft" : "https://youtu.be/J41ipvUvIzI",
  }

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

  if(!fs.existsSync("./sleep.db")) await require("../db_load.js").run(bot)
  console.log("Database Online.")

  await slashcommands_loader(bot)

  bot.user.setPresence({activities: [{ name: "Jean-Claude coder", type: 3 }], status: "dnd"})
}
