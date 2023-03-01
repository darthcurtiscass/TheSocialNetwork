const { User, Thought } = require("../models");

module.exports = {
  getAllUsers(req, res) {
    User.find().then(async (userData) => {
      const users = {
        userData,
      };
      return res.json(users);
    });
  },

  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "no user found by that id" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      // {$pull: { thoughts,  }},
      { runValidators: true, new: true }
    )
      .then((updatedUser) =>
        !updatedUser
          ? res.status(404).json({ message: "wrong update" })
          : res.status(200).json(updatedUser)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((deletedUser) =>
        !deletedUser
          ? res.status(404).json({ message: "no user by that id" })
          : Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
      )
      .then(() => res.json({ message: "user and thier thoughts erased" }));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } }
    )
      .then((userFriend) =>
        !userFriend
          ? res.status(404).json({ message: "no friend found" })
          : res.status(200).json(userFriend)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userFriend) =>
        !userFriend
          ? res.status(404).json({ message: "no friend found" })
          : res.status(200).json(userFriend)
      )
      .catch((err) => res.status(500).json(err));
  },
};
