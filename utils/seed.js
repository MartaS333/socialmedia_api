const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { usernames, userThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("sseding");

  // Drops existing
  await User.deleteMany({});
  await Thought.deleteMany({});

  await User.insertMany(usernames);

  for (thought of userThoughts) {
    const users = usernames[Math.floor(Math.random() * usernames.length)];

    const newThought = await Thought.insertMany({
      ...thought,
      username: users.username,
    });

    await User.findOneAndUpdate(
      { _id: users.userId },
      { $addToSet: { thoughts: newThought } },
      { new: true }
    );
  }

  process.exit(0);
});
