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
      firstName: "Ash",
      lastName: "Ketchum",
      email: "ak@tripnder.com",
      password: hashedPassword,
      travelStyle: "Backpacker",
      budget: "Low",
      bio: "Gotta catch 'em all — and all the destinations too.",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      languages: ["EN", "JP"]
    },
    {
      firstName: "Gary",
      lastName: "Oak",
      email: "go@tripnder.com",
      password: hashedPassword,
      travelStyle: "Luxury",
      budget: "High",
      bio: "I travel in style. Always one step ahead.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      languages: ["EN"]
    },
    {
      firstName: "Misty",
      lastName: "Williams",
      email: "mw@tripnder.com",
      password: hashedPassword,
      travelStyle: "Adventure",
      budget: "Medium",
      bio: "Water lover, beach explorer, always up for an adventure.",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      languages: ["EN", "FR"]
    },
    {
      firstName: "Brock",
      lastName: "Harrison",
      email: "bh@tripnder.com",
      password: hashedPassword,
      travelStyle: "Comfort",
      budget: "Medium",
      bio: "Food lover and cultural explorer. Best travel chef around.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      languages: ["EN", "ES"]
    },
    {
      firstName: "Sara",
      lastName: "García",
      email: "sg@tripnder.com",
      password: hashedPassword,
      travelStyle: "Backpacker",
      budget: "Low",
      bio: "Solo traveler from Barcelona. Markets, street food and sunsets.",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      languages: ["EN", "ES", "CA"]
    },
    {
      firstName: "Yuki",
      lastName: "Tanaka",
      email: "yt@tripnder.com",
      password: hashedPassword,
      travelStyle: "Comfort",
      budget: "High",
      bio: "First time in Europe. Looking for someone to explore with.",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      languages: ["EN", "JP"]
    },
    {
      firstName: "Marco",
      lastName: "Rossi",
      email: "mr@tripnder.com",
      password: hashedPassword,
      travelStyle: "Adventure",
      budget: "Low",
      bio: "Hiking, camping and meeting people from all over the world.",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      languages: ["EN", "IT"]
    },
    {
      firstName: "Lena",
      lastName: "Schmidt",
      email: "ls@tripnder.com",
      password: hashedPassword,
      travelStyle: "Comfort",
      budget: "Medium",
      bio: "Travel photographer. Always looking for the perfect shot.",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      languages: ["EN", "DE"]
    },
  ]);

  mongoose.connection.close();
  console.log("Seed completed!");
}

seed();