const fs = require('fs')

module.exports.execute = params => {
  if (params.length === 0) {
    throw new Error('Too few arguments!')
  }
  params[0] = params[0].toLowerCase()

  const modelFile = fs.readFileSync('./generator/stubs/model.js').toString().replace('MODEL_NAME', params[0].charAt(0).toUpperCase() + params[0].slice(1))

  fs.writeFileSync(`./models/${params[0]}.js`, modelFile)
  console.log(`${params[0]} generated successfully!`)
}

module.exports.help = `

    Description: 
        Generates a model.
    Arguments:
        Model name
`

module.exports.folder = 'models'
