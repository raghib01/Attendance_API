// in this controller using for registration and login controller system....
const { registerSrevice, loginService } = require("../service/authService");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(400).json({ message: `invelide data` });
  }
  try {
    const user = await registerSrevice({ name, email, password });
    return res.status(201).json({ message: `user create successfully`, user });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginService({ email, password });
    return res.status(200).json({ message: `login successfully`, token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerController,
  loginController,
};
