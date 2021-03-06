const join = require('./lib/join')

module.exports = function (appDir) {
  const core = [
    'ssb-server/plugins/master',
    'ssb-server/plugins/local',
    'ssb-server/plugins/unix-socket', // in case config includes sockets
    'ssb-server/plugins/no-auth', // in case config includes sockets
    'ssb-server/plugins/logging'
  ]

  return [
    ...core.map(makeElectronFriendly),

    // TODO check the plugins provided and use their versions if possible (rather than ssb-ahoy ones)
    'ssb-legacy-conn',
    'ssb-replicate',
    // 'ssb-ebt', // NOTE - currently stalls during initial sync
    'ssb-friends',
    'ssb-invite'
  ]

  function makeElectronFriendly (plugin) {
    return join('../..', appDir, 'node_modules', plugin)
  }
  // NOTE this is setting relative path _from the position of electron/process/server.js
  // to the plugin in the host app ):
}
