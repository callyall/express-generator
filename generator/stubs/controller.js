const controller = require('express').Router();
const error = require('../common/error');
const validate = require('../middleware/validateMiddleware');

controller.get('/', (req, res)=>req.modelService.all()
  .then(json=>res.send(json))
  .catch(e=>error.send(res,500,e)));

controller.get('/:id', (req, res)=>req.modelService.get(req.params.id)
  .then(model=>{
    if(model === null){
      error.send(res,404,null);
    }else{
      res.send(model);
    }
  })
  .catch(e=>error.send(res,404,e)));

controller.put('/:id', validate.update(['model']), (req,res)=>req.modelService.update(req.model)
  .then(()=>res.send(req.model))
  .catch(e=>error.send(res,500,e)));  

controller.post('/', validate.save(['model']), (req,res)=>req.modelService.create(req.model)
  .then(res.send('Model saved successfully!'))
  .catch(e=>error.send(res,500,e)));

controller.delete('/:id',(req,res)=>req.modelService.delete(req.params.id)
  .then(()=>res.send(''))
  .catch(e=>error.send(res,500,e)));  

module.exports = controller;