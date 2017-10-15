var facebookApi = require('./facebookApi.js')
const echoServiceListener = {
  run: (message) => facebookApi.sendMessage(message.senderId, message.message)
}

module.exports = echoServiceListener