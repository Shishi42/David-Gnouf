const config = require("../config.json")

module.exports = async (bot, message) => {

  if(message.author.bot || message.channel.type === "dm") return

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
    } 

    else if(message.content.includes("twitter") || message.content.includes("x.com")) {
      res = message.content.split(".com/")[1].split('?')[0].split(')')[0]
      bot.channels.fetch(config.chan_sort)
        .then(chan => chan.messages.fetch()
          .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
          .catch((error) => {
            bot.channels.cache.get(config.chan_sort).send(res)
          }))
      return message.delete()
    }
    
    else if (message.content.includes("artworks")){
      res = message.content.split("artworks/")[1].split(')')[0]
      bot.channels.fetch(config.chan_artworks)
        .then(chan => chan.messages.fetch()
          .then(messages => messages.filter(m => m.author.id === bot.user.id).first().edit(messages.filter(m => m.author.id === bot.user.id).first().content + '\n' + res))
          .catch((error) => {
            bot.channels.cache.get(config.chan_artworks).send(res)
          }))
      return message.delete()
    }
    
    else if (message.content.includes("users")){
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
}
