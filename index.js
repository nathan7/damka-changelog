var union = require('lodash').union
  , objbind = require('objbind')

function equal(a, b) {
  /*jshint eqnull:true */
  if (a == b)
    return true
  if (!a && !b)
    return true
  if (a instanceof Error && b instanceof Error && a.message == b.message)
    return true
  return false
}

module.exports =
function logChange(log, oldSystemState, systemState) {
  if (equal(systemState, oldSystemState)) return

  if (systemState instanceof Error)
    return log.error('down', systemState.toString())

  if (oldSystemState instanceof Error)
    log.info('up')

     systemState =    systemState || {}
  oldSystemState = oldSystemState || {}

  var hosts = union(Object.keys(systemState || {}), Object.keys(oldSystemState || {}))
  hosts.forEach(function(_log, host) {
    var    hostState =    systemState[host] || null
      , oldHostState = oldSystemState[host] || null
      , log = objbind(_log, host)

    if (equal(hostState, oldHostState)) return

    if (hostState instanceof Error)
      return log.error('down', hostState.toString())
    if (oldHostState instanceof Error)
      log.info('up')

       hostState =    hostState || {}
    oldHostState = oldHostState || {}

    var services = union(Object.keys(hostState || {}), Object.keys(oldHostState || {}))
    services.forEach(function(_log, service) {
      var    serviceState =    hostState[service] || null
        , oldServiceState = oldHostState[service] || null
        , log = objbind(_log, service)

      if (equal(serviceState, oldServiceState)) return

      if (serviceState instanceof Error)
        return log.error('down', serviceState.toString())
      if (oldServiceState instanceof Error)
        log.info('up')
    }.bind(null, log))
  }.bind(null, log))
}
