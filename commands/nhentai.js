const Command = require("./command")

module.exports = class nhentai extends Command{

    static match(message){
      return message.content.startsWith('nhentai')
    }

    static action(message, client){
      let args = message.content.split(' ')
      args.shift()

      if(args[1]){
        message.channel.send('Un seul à la fois. <:kappacr:700442157256802436>')
        return
      }

      message.channel.send('https://www.nhentai.net/g/'+ args[0])
      message.delete()
    }
}
