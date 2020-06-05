require("dotenv").config()

const Discord = require("discord.js");
const client = new Discord.Client();
const {prefix, chan_dev} = require("./config.json");

const Google = require('./commands/google')
const Hentai = require('./commands/nhentai')
const Say = require('./commands/say')
const Ping = require('./commands/ping')
const Play = require('./commands/play')

client.on("ready", () => {
  console.log(`Connecté en tant que ${client.user.tag}!`);
  client.channels.cache.get(chan_dev).send('David est connecté.\nIncroyable du cul !');

  client.user.setPresence({status : 'dnd', activity: { name: 'Jean-Claude coder.', type: 'WATCHING' }});

})

client.on("message", message => {
  if (message.author.bot) return;

  if(message.content.startsWith(`${prefix}`)){
    message.content = message.content.substr(1)

    let commandUsed =
    Google.parse(message, client) ||
    Hentai.parse(message, client) ||
    Say.parse(message, client) ||
    Ping.parse(message, client) ||
    Play.parse(message, client)

  }

})

client.login(process.env.BOT_TOKEN);
