const { model, Schema } = require("mongoose");

const studentAttendenceSchema = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  adminAttendence: {
    type: Schema.Types.ObjectId,
    ref: "adminAttndence",
  },
});

const studentAttendence = model("studentAttendence", studentAttendenceSchema);
module.exports = studentAttendence;
