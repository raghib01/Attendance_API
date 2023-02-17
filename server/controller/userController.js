const User = require("../Model/User");
const userService = require("../service/userService");
const authService = require("../service/authService");
const error = require("../utils/error");

//Get all users....
const getUser = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select.
   */
  try {
    const allUser = await userService.finduser();
    return res.status(200).json({ message: `finding user`, allUser });
  } catch (e) {
    next(e);
  }
};

//Get user by ID
const getUserByID = async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const user = await userService.findUserProperty("._id", userID);
    if (!user) {
      throw error(`You are not an user, please login`, 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
//create user by ID
const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await authService.registerSrevice({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};
//PUT user by ID
const putUserByID = async (req, res, next) => {
  const userID = req.params.userID;
  const { name, email, roles, accountStatus } = req.body;

  try {
    const user = await userService.updateUser(userID, {
      name,
      email,
      roles,
      accountStatus,
    });

    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(400).json(user);
  } catch (e) {
    next(e);
  }
};

//Patch user by ID
const patchUserByID = async (req, res, next) => {
  const userID = req.params.userID;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await userService.findUserProperty("_id", userID);

    if (!user) {
      throw error("User not found", 404);
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

//DELETE user by ID
const deleteUserByID = async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const user = await userService.findUserProperty("_id", userID);

    if (user) {
      await user.remove();
      return res
        .status(203)
        .json({ message: `${user.name} is delete` })
        .send();
    } else {
      throw error("User id not Found", 404);
    }
    //TODO: call delete all user
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUser,
  getUserByID,
  postUser,
  putUserByID,
  patchUserByID,
  deleteUserByID,
};
