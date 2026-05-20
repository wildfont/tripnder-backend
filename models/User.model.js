const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    bio: String,
    travelStyle:{
        type: String,
        enum:['Backpacker', 'Comfort', 'Luxury', 'Adventure'],
    },
    budget: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    languages: [String],
    avatar: String
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

module.exports = User;
