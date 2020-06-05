module.exports = class command{

    static parse(message, client){
      if(this.match(message)){
        this.action(message, client)
        return true
      }
      return false
    }

    static match(message){
      return false
    }

    static action(message, client){
      return false
    }
}
