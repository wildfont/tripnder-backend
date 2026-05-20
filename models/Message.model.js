const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    text: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    connection: {
      type: Schema.Types.ObjectId,
      ref: "Connection",
    },
  },
  {
    timestamps: true,
  },
);

const Message = model("Message", messageSchema);

module.exports = Message;
