const User = require("../Model/User");
const error = require("../utils/error");

//User finding service from User model
const finduser = () => {
  return User.find();
};

const findUserProperty = (key, value) => {
  if (key == "._id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

const updateUser = async (id, data) => {
  const user = await findUserProperty("email", data.email);
  if (user) {
    throw error("Email already uses", 400);
  }
  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = {
  findUserProperty,
  createNewUser,
  finduser,
  updateUser,
};
