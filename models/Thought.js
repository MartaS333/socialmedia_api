const dayjs = require("dayjs");
const { Schema, model, Types } = require("mongoose");
const reactions = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => {
        return dayjs(date).format("MMM DD, YYYY [at] hh:mm a");
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactions],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
