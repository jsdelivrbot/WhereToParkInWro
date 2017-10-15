var facebookApi = require('./facebookApi.js')
var locationListener = require('./locationListener.js')
var echoServiceListener = require('./echoServiceListener.js')



const debug = {
  run: (message) => console.log(message)
}

const listeners = [
  locationListener,
  echoServiceListener,
  debug
]

const runAll = (message, listeners=listeners) => {
  listeners.forEach(
    (listener) =>
      listener.run(message)
    );
}

const runUntilHandled = (message, listeners=listeners) => {
  listeners.some((listener) => listener.run(message));
}

module.exports = {
  runAll,
  runUntilHandled,
  listeners
}
