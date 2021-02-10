const { Schema, model } = require("mongoose");

const schema = new Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: [{ type: String, ref: "Role" }],
  classrooms: [{ type: String, ref: "Classroom" }],
});

module.exports = model("User", schema);
