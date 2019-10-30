const { Schema, model } = require('mongoose')

const schema = new Schema({
  // Put fields here...
  created_at: Date,
  updated_at: Date
})

// Set timestamps on save...
schema.pre('save', function (next) {
  this.set({ created_at: new Date(), updated_at: new Date() })
  next()
})

// Set updated_at timestamp at update...
schema.pre('updateOne', function (next) {
  this._update.updated_at = new Date()
  next()
})

module.exports = model('MODEL_NAME', schema)
