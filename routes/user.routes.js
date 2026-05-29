const router = require("express").Router();

const User = require("../models/User.model.js");

const verifyToken = require("../middleware/auth.middlewares");

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const filters = { _id: { $ne: req.payload._id } };
    if (req.query.destination) filters.destination = req.query.destination;
    if (req.query.style) filters.travelStyle = req.query.style;

    const response = await User.find(filters);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.put("/profile", verifyToken, async (req, res, next) => {
  try {
    const updatedProfile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      languages: req.body.languages,
      bio: req.body.bio,
      travelStyle: req.body.travelStyle,
      avatar: req.body.avatar,
      budget: req.body.budget,
    };
    const response = await User.findByIdAndUpdate(
      req.payload._id,
      updatedProfile,
    );

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    console.log("userId:", req.params.userId);
    const response = await User.findById(req.params.userId);
    console.log("user found:", response);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
