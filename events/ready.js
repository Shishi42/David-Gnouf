const Sequelize = require("sequelize")
const slashcommands_loader = require("../slashcommands_loader")

module.exports = async bot => {

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

  if(!await bot.Pokemons.findOne()) await require("../db_load.js").run(bot)

  console.log("Database Online.")

  await slashcommands_loader(bot)

  bot.user.setPresence({activities: [{ name: "Jean-Claude coder", type: 3 }], status: "dnd"})
}
