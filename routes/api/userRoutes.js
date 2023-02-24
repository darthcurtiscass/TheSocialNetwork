const router = require('express').Router();
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

// /api/courses/:userId
router
  .route('/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
