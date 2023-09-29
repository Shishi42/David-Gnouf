const Discord = require("discord.js")

module.exports = {

  name: "poll",
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
      .then(function(msg){
        msg.react("<:check:334046325098414080>")
        msg.react(":grey_question:")
        msg.react(":x:")})
      .catch((error) => {message.reply("Message not found with this id.")})
    // return message.delete()
  }
}
