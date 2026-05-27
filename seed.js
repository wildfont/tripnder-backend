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
      firstName: "Esteban",
      lastName: "Quito",
      email: "ak@tripnder.com",
      password: hashedPassword,
      travelStyle: "Backpacker",
      budget: "Low",
      bio: "Gotta catch 'em all — and all the destinations too.",
      avatar: "https://i.pravatar.cc/300?img=67",
      languages: ["EN", "JP"]
    },
    {
      firstName: "Seymore",
      lastName: "Butts",
      email: "go@tripnder.com",
      password: hashedPassword,
      travelStyle: "Luxury",
      budget: "High",
      bio: "I travel in style. Always one step ahead.",
      avatar: "https://i.pravatar.cc/300?img=15",
      languages: ["EN"]
    },
    {
      firstName: "Anna",
      lastName: "Bohueles",
      email: "mw@tripnder.com",
      password: hashedPassword,
      travelStyle: "Adventure",
      budget: "Medium",
      bio: "Water lover, beach explorer, always up for an adventure.",
      avatar: "https://i.pravatar.cc/300?img=5",
      languages: ["EN", "FR"]
    },
    {
      firstName: "Al",
      lastName: "Coholic",
      email: "bh@tripnder.com",
      password: hashedPassword,
      travelStyle: "Comfort",
      budget: "Medium",
      bio: "Food lover and cultural explorer. Best travel chef around.",
      avatar: "https://i.pravatar.cc/300?img=3",
      languages: ["EN", "ES"]
    },
    {
      firstName: "Lola",
      lastName: "Mento",
      email: "sg@tripnder.com",
      password: hashedPassword,
      travelStyle: "Backpacker",
      budget: "Low",
      bio: "Solo traveler from Barcelona. Markets, street food and sunsets.",
      avatar: "https://i.pravatar.cc/300?img=24",
      languages: ["EN", "ES", "CA"]
    },
    {
      firstName: "Kara",
      lastName: "Oke",
      email: "yt@tripnder.com",
      password: hashedPassword,
      travelStyle: "Comfort",
      budget: "High",
      bio: "First time in Europe. Looking for someone to explore with.",
      avatar: "https://i.pravatar.cc/300?img=25",
      languages: ["EN", "JP"]
    },
    {
      firstName: "Mario",
      lastName: "Bros",
      email: "mr@tripnder.com",
      password: hashedPassword,
      travelStyle: "Adventure",
      budget: "Low",
      bio: "Hiking, camping and meeting people from all over the world.",
      avatar: "https://i.pravatar.cc/300?img=68",
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
      avatar: "https://i.pravatar.cc/300?img=23",
      languages: ["EN", "DE"]
    },
  ]);

  mongoose.connection.close();
  console.log("Seed completed!");
}

seed();