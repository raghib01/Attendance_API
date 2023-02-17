// Name, email, password, role, account status

const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: [3, `minimum used 3 chars`],
    max: [15, `max used 15 chars`],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(v);
      },
      message: (props) => `invelid email ${props.value}`,
    },
  },
  password: {
    type: String,
    min: [8, "using minimum 8 Charectors"],
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
    required: true,
  },
});

const User = model("User", userSchema);
module.exports = User;
