var facebookApi = require('./facebookApi.js')

const locationListener = {
  run: (message) => {
    if(message.message.indexOf('location') !== -1) {
      facebookApi.askForLocation(message.senderId, message.message)
    }
  }
}
const echoServiceListener = {
  run: (message) => facebookApi.sendMessage(message.senderId, message.message)
}

const debug = {
  run: (message) => console.log(message)
}

module.exports = {
  listeners: [
    locationListener,
    echoServiceListener,
    debug
  ]
}
