const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
  lastname: {type: String, required: true},
  firstname: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  classId: {type: Types.ObjectId, required: true},
  role: [{type: String, ref: 'Role'}],
})

module.exports = model('Student', schema)