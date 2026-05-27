process.loadEnvFile(".env");
const mongoose = require("mongoose");

const User = require("./models/User.model.js");

const connectDB = require("./db");

const bcrypt = require("bcryptjs");

async function seed() {
  await connectDB();
  const hashedPassword = await bcrypt.hash("Banana99", 12);

  await User.deleteMany({});
  await User.insertMany([
    {
      firstName: "ash",
      lastName: "ketchum",
      email: "ak@tripnder.com",
      password: hashedPassword,
      travelStyle: "Backpacker",
      budget: "Low",
    },
    {
      firstName: "gary",
      lastName: "oak",
      email: "go@tripnder.com",
      password: hashedPassword,
      travelStyle: "Luxury",
      budget: "High",
    },
    {
      firstName: "brok",
      lastName: "harrison",
      email: "bh@tripnder.com",
      password: hashedPassword,
      travelStyle: "Backpacker",
      budget: "Medium",
    },
    {
      firstName: "misty",
      lastName: "williams",
      email: "mw@tripnder.com",
      password: hashedPassword,
      travelStyle: "Comfort",
      budget: "High",
    },
  ]);

  mongoose.connection.close();
}

seed();
