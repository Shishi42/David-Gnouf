const Command = require("./command")

module.exports = class play extends Command{

    static match(message){
      return message.content.startsWith('play')
    }

    static action(message, client){
      let voiceChannel = client.channels.cache.get("295252502679650316")

      voiceChannel.join()
        .then(function (connection){
          connection.play('./demo.mp3')
        })
    }
}
