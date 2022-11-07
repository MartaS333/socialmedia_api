const { User, Thought } = require("../models");

module.exports = {
  // Gets all users minus the "__v"
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get single user and expands the friends and thoughts arrays
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that id" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with that id" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with that id" });
        } else {
          // Deletes the thoughts associated with the user being deleted
          return Thought.deleteMany({ _id: { $in: user.thoughts } });
        }
      })
      .then(() => res.json({ message: "User and thoughts deleted" }))
      .catch((err) => res.status(500).json(err));
  },
  // Friends list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        console.log(user);
        res.json(user);
      })
      .catch((err) => ers.status(500).json(err));
  },
};
