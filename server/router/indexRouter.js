const router = require("express").Router();
const authRoutes = require("./authRoute");
const userRouter = require("./userRouter");
const authMiddleware = require("../middleware/authMiddleware");

router.use("/api/v2/press", authRoutes);
router.use("/api/v2/user", authMiddleware, userRouter);

module.exports = router;
