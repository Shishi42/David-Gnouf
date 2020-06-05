const Command = require("./command")

module.exports = class google extends Command{

    static match(message){
      return message.content.startsWith('google')
    }

    static action(message, client){
      let args = message.content.split(' ')
      args.shift()
      message.channel.send('https://www.google.fr/search?q='+ args.join('+'))
      message.delete()
    }
}
