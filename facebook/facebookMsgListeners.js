var locationListener = require('./locationListener.js')
var echoServiceListener = require('./echoServiceListener.js')

const debug = {
  run: (message) => console.log(JSON.stringify(message))
}

const fbBisteners = [
  debug,
  locationListener,
  echoServiceListener
]

const buildReplyTo = (message, listeners=fbBisteners) => {
  for(var i =0 ; i<listeners.length;i++) {
    var newMessage= listeners[i].run(message);
    if(newMessage) return newMessage
  }
}

module.exports = {
  buildReplyTo
}
