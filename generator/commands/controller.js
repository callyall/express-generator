const fs = require('fs')

module.exports.execute = params => {
  if (params.length === 0) {
    throw new Error('Too few arguments!')
  }
  let controllerFile = fs.readFileSync('./generator/stubs/controller.js').toString()
  if (params[1] !== undefined) {
    controllerFile = controllerFile.replace(/modelService/g, `${params[1]}Service`)
  }

  if (params[2] !== undefined) {
    controllerFile = controllerFile.replace(/model/g, params[2])
  }

  fs.writeFileSync(`./controllers/${params[0]}Controller.js`, controllerFile)
  console.log(`${params[0]}Controller generated successfully!`)
}

module.exports.help = `

    Description: 
        Generates a CRUD controller.
    Arguments:
        Controller name
        Service name(optional)
        Model name(optional)
`

module.exports.folder = 'controllers'
