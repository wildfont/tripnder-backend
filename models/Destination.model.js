const { Schema, model } = require("mongoose");

const destinationSchema = new Schema(
  {
    city: {
      type: String,
      required: [true, "City is required."],
    },
    country: {
      type: String,
      required: [true, "Country is required."],
    },
    flag: {
      type: String,
      required: [true, "Flag is required."],
    },
    dateFrom: String,
    dateTo: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Destination = model("Destination", destinationSchema);

module.exports = Destination;
