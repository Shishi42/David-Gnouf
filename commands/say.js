const Command = require("./command")

module.exports = class say extends Command{

    static match(message){
      return message.content.startsWith('say')
    }

    static action(message, client){
      let args = message.content.split(' ')
      args.shift()
      message.channel.send(args.join(' '))
      message.delete()
    }
}
