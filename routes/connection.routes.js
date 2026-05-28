const router = require("express").Router();

const Connection = require("../models/connection.model.js");

const verifyToken = require("../middleware/auth.middlewares");

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const asRequester = await Connection.find({
      requester: req.payload._id,
    })
      .populate("requester", "firstName lastName avatar")
      .populate("recipient", "firstName lastName avatar");
    const asRecipient = await Connection.find({
      recipient: req.payload._id,
    })
      .populate("requester", "firstName lastName avatar")
      .populate("recipient", "firstName lastName avatar");
    const seen = new Set();
    const unique = [...asRequester, ...asRecipient].filter((c) => {
      if (seen.has(c._id.toString())) return false;
      seen.add(c._id.toString());
      return true;
    });
    res.status(200).json(unique);
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const recipientId = req.body.recipient;
    const destinationId = req.body.destination;

    const existing = await Connection.findOne({
      requester: recipientId,
      recipient: req.payload._id,
    });

    if (existing && !destinationId) {
      existing.status = "accepted";
      await existing.save();
      res.status(200).json({ match: true, connection: existing });
    } else {
      const newConnection = await Connection.create({
        requester: req.payload._id,
        recipient: recipientId,
        status: "pending",
        destination: destinationId || undefined,
      });
      res.status(201).json({ match: false, connection: newConnection });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await Connection.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await Connection.findByIdAndDelete(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
