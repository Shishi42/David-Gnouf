const Discord = require("discord.js")

module.exports = {

  name: "poll",
  description: "React to a message with poll emojis",
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

    await message.reply({content: "Reacting..", ephemeral: true})
   
    message.channel.messages.fetch(args.get("id").value)
      .then(function(msg){
        msg.react("✅")
        msg.react("❔")
        msg.react("❌")})
      .catch((error) => {return message.editReply({content: "Message with this id not found.", ephemeral: true})})

    return await message.editReply({content: "Done.", ephemeral: true})
  }
}
