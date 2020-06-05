const Command = require("./command")

module.exports = class ping extends Command{

    static match(message){
      return message.content.startsWith('ping')
    }

    static action(message, client){
      message.channel.send('pong, '+ Math.round(client.ws.ping) + ' ms')
    }
}
