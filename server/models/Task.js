const {Schema, model, Types} = require('mongoose')

const schemaAnswer = new Schema({
  answer: {type: String}
})

const schema = new Schema({
  question: String,
  answers: [schemaAnswer],
  right: String,
  type: String,
  testId: {type: Types.ObjectId, required: true}
})

module.exports = model('Task', schema)