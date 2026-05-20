const { Schema, model } = require("mongoose");

const connectionSchema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    destination: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Connection = model("Connection", connectionSchema);

module.exports = Connection;
