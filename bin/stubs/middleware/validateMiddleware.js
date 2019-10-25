const error = require('../common/error');
module.exports.save = modelNames=>(req,res,next)=>Promise.all(modelNames.map(m=>req[m+'Service'].validate(req.body)))
    .then(models=>{
        models.forEach(m=>req[m.constructor.modelName.toLowerCase()]=m)
        next();
    })
    .catch(e=>e.name === 'ValidationError' ? res.send(e) : error.send(res,500,e));

module.exports.update = modelNames=>(req,res,next)=>Promise.all(modelNames.map(m=>req[m+'Service'].validateUpdate(req.params.id,req.body)))
    .then(models=>{
        models.forEach(m=>req[m.constructor.modelName.toLowerCase()]=m)
        next();
    })
    .catch(e=>e.name === 'ValidationError' ? res.send(e) : error.send(res,500,e));    