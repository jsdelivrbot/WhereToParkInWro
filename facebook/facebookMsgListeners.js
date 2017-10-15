var facebookApi = require('./facebookApi.js')
var locationListener = require('./locationListener.js')
var echoServiceListener = require('./echoServiceListener.js')



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

const runUntilHandled = (message, listeners=fbBisteners) => {
  listeners.some((listener) => listener.run(message));
}

module.exports = {
  runAll,
  runUntilHandled,
  listeners: fbBisteners
}
