const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { findUserProperty, createNewUser } = require("./userService");
const error = require("../utils/error");
const registerSrevice = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserProperty("email", email);
  if (user) {
    throw error("User already exist", 400);
  }

  const salt = await bcrypt.genSalt(11);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({
    name,
    email,
    password: hash,
    roles,
    accountStatus,
  });
};

const loginService = async ({ email, password }) => {
  const user = await findUserProperty("email", email);
  if (!user) {
    throw error(`invalide User`, 400);
  }

  // password verify

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw error(`invalide Password`, 400);
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, "secret_key");
};

module.exports = {
  registerSrevice,
  loginService,
};
