const fs = require('fs')

module.exports.execute = params => {
  if (params.length < 2) {
    throw new Error('Too few arguments!')
  }
  const serviceFile = fs.readFileSync('./generator/stubs/service.js').toString()
  fs.writeFileSync(`./services/${params[0]}Service.js`, serviceFile.replace('MODEL_NAME', params[1]))
  console.log(`${params[0]}Service generated successfully!`)
}

module.exports.help = `

    Description: 
        Generates a service.
    Arguments:
        Service name
        Model name
`

module.exports.folder = 'services'
