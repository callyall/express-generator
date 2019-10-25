const Model = require('../models/MODEL_NAME');

module.exports.validate = body => {
    const modelInstance = new Model(body);
    return modelInstance.validate().then(()=>modelInstance);
};

module.exports.validateUpdate = (id,body) => Model.findById(id)
    .then(modelInstance=>{
        /**
         * Delete unwanted fields ex:
         * delete body.password;
         */
        modelInstance.set(body);
        return modelInstance.validate().then(()=>modelInstance);
    });

module.exports.get = id=>Model.findById(id);

module.exports.all = ()=>Model.find({});

module.exports.create = modelInstance=>modelInstance.save();

module.exports.update = modelInstance=>Model.updateOne({_id:modelInstance._id},modelInstance);

module.exports.delete = id=>Model.deleteOne({_id:id});