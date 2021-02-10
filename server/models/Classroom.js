const {Schema, model} = require('mongoose')

const schema = new Schema({
  parallel: {type: String, required: true},
  letter: {type: String,required: true},
  owner: [{type: String, ref: 'User'}]
})

module.exports = model('Classroom', schema)

