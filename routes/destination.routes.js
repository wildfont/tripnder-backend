const router = require("express").Router();

const Destination = require("../models/destination.model.js");

const verifyToken = require("../middleware/auth.middlewares");

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const response = await Destination.find({ owner: req.payload._id });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await Destination.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const updatedDestination = {
      city: req.body.city,
      country: req.body.country,
      flag: req.body.flag,
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
      owner: req.payload._id,
    };
    const response = await Destination.findByIdAndUpdate(
      req.params.id,
      updatedDestination,
    );

    res.status(200).json({ message: "Destination updated" });
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const newDestination = {
    city: req.body.city,
    country: req.body.country,
    flag: req.body.flag,
    dateFrom: req.body.dateFrom,
    dateTo: req.body.dateTo,
    owner: req.payload._id,
  };
  Destination.create(newDestination)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await Destination.findByIdAndDelete(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
