const moduleAlias = require('module-alias')

// Server Absolute Routing
moduleAlias.addAliases({
  '@models': __dirname + '/../../models',
  '@error': __dirname + '/../../lib/error'
})
