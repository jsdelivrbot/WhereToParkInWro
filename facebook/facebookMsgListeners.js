var locationListener = require('./locationListener.js')
var echoServiceListener = require('./echoServiceListener.js')
var theParkListener = require('./theParkListener.js')



const debug = {
  run: (message) => console.log(JSON.stringify(message))
}

const fbBisteners = [
  locationListener,
  echoServiceListener,
  debug
]

const runAll = (message, listeners=fbBisteners) => {
  listeners.forEach(
    (listener) =>
      listener.run(message)
    );
}

const buildReplyTo = (message, listeners=fbBisteners) => {
  for(var i =0 ; i<listeners.length;i++) {
    var newMessage= listeners[i].run(message);
    if(newMessage) return newMessage
  }
}

module.exports = {
  buildReplyTo
}
