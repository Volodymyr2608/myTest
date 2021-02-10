const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  classId: { type: Types.ObjectId, required: true },
  status: { type: Boolean, required: true },
});

module.exports = model("Test", schema);
