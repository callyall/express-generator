const fs = require('fs')

module.exports.execute = params => {
  if (params.length === 0) {
    throw new Error('Too few arguments!')
  }
  const middlewareFile = fs.readFileSync('./generator/stubs/middleware.js').toString()
  fs.writeFileSync(`./middleware/${params[0]}Middleware.js`, middlewareFile)
  console.log(`${params[0]}Middleware generated successfully!`)
}

module.exports.help = `

    Description: 
        Generates a middleware.
    Arguments:
        Middleware name
`

module.exports.folder = 'middleware'
