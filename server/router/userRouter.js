const router = require("express").Router();
const userController = require("../controller/userController");

/**
 * Get user by ID.
 *
 */
router.get("/:userID", userController.getUserByID);

/**
 * Update user PUT by ID.
 * @method PUT
 */
router.put("/:userID", userController.putUserByID);

/**
 * Get user PATCH by ID.
 * @method PATCH
 */
router.patch("/:userID", userController.patchUserByID);

/**
 * delete user by ID.
 * @method DELETE
 */
router.delete("/:userID", userController.deleteUserByID);

/**
 * Get all users. include
 *  - filter
 *  - sorting
 *  - pagination
 *  - select Properties
 * @route /api/user?sort=["by","name"]
 * @method GET
 * @visibility Private
 */
router.get("/", userController.getUser);

/**
 * Create Admin Users.
 *
 */
router.post("/", userController.postUser);
module.exports = router;
