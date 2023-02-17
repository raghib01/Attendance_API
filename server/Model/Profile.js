// firstname, last name

const { model, Schema } = require("mongoose");

const ProfileSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  avater: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Profile = model("Profile", ProfileSchema);
module.exports = Profile;
