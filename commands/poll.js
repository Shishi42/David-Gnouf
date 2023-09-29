const Discord = require("discord.js")

module.exports = {

  name: "Poll",
  description: "React to a message with poll emoji",
  permission: null,
  dm: true,
  category: "Utility",
  options: [
    {
      type: "string",
      name: "id",
      description: "Id of the message to react",
      required: true,
      autocomplete: false,
    }
  ],

  async run(bot, message, args) {
    
    message.channel.messages.fetch(args.get("id").value)
      .then(message => message.react("<:check:334046325098414080>"); message.react(":grey_question:")); message.react(":x:")))
    return message.delete()
  }
}
