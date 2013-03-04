var assert = require('assert')
  , inspect = require('util').inspect
  , spec = require('./spec')
  , compare = require('./')

function result(a, b) {
  var logObj = {}
    , log = { info: add.bind(null, 'info')
            , error: add.bind(null, 'error')
            }
  function add(level) {
    var msg = [].join.call([].slice.call(arguments, 1), ' ')
    if (!logObj.hasOwnProperty(level))
      logObj[level] = msg
    else if (logObj[level] instanceof Array)
      arr.push(msg)
    else 
      logObj[level] = [logObj[level], msg]
  }

  compare(log, a, b)
  return logObj
}

var maxLen = 0
spec.forEach(function(specItem) {
  maxLen = Math.max(inspect(specItem[0]).length, inspect(specItem[1]).length, maxLen)
})

function pad(str) {
  while (str.length < maxLen) str += ' '
  return str
}

spec.forEach(function(specTriple) {
  var from = specTriple[0]
    , to   = specTriple[1]
    , out  = specTriple[2]

  console.log(pad(inspect(from)), '->', pad(inspect(to)), '   ', inspect(out))
  assert.deepEqual(result(from, to), out)
})
