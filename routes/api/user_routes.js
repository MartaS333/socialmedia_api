const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/users_controller");

// -- Directs to: /api/users <GET, POST>
router.route("/").get(getAllUsers).post(createUser);

// -- Directs to: /api/users/:id <GET, PUT, DELETE>
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// -- Directs to: /api/users/:userId/friends/:friendId <POST, DELETE>
router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

// Module export router
module.exports = router;
