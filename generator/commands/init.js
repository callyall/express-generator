const fs = require('fs')
const { spawn } = require('child_process')

module.exports.execute = () => {
  fs.readdirSync('./generator/commands')
    .map(file => require(`./${file.replace('.js', '')}`).folder)
    .forEach(folder => folder !== undefined && !fs.existsSync(`./${folder}`) && fs.mkdirSync(`./${folder}`))

  fs.readdirSync('./generator/stubs')
    .filter(i => fs.statSync(`./generator/stubs/${i}`).isDirectory())
    .forEach(dir => {
      !fs.existsSync(`./${dir}`) && fs.mkdirSync(`./${dir}`)
      fs.readdirSync(`./generator/stubs/${dir}`)
        .filter(file => !fs.statSync(`./generator/stubs/${dir}/${file}`).isDirectory())
        .forEach(file => fs.writeFileSync(`./${dir}/${file}`, fs.readFileSync(`./generator/stubs/${dir}/${file}`)))
    })

  fs.writeFileSync('./app.js', fs.readFileSync('./generator/stubs/app.js').toString())

  const init = spawn(process.env.OS.includes('Windows') ? 'npm.cmd' : 'npm', ['init'])

  init.stdout.on('data', data => {
    console.log(data.toString())
    init.stdin.write('\r')
  })

  init.on('error', console.error)

  init.on('close', () => {
    const dependencies = require('../stubs/package')
    const pack = require('../../package')
    delete pack.main
    for (const k in dependencies) {
      pack[k] = dependencies[k]
    }

    fs.writeFileSync('./package.json', JSON.stringify(pack, null, '\t'))
    const install = spawn(process.env.OS.includes('Windows') ? 'npm.cmd' : 'npm', ['install'])
    install.stdout.on('data', d => console.log(d.toString()))
    install.on('error', console.error)
    install.on('close', () => console.log('Project initiated successfully!'))
  })
}

module.exports.help = `

    Description: 
        Initiates a project.
`
