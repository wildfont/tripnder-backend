const router = require("express").Router();

const Connection = require("../models/connection.model.js");

const verifyToken = require("../middleware/auth.middlewares");

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const asRequester = await Connection.find({ requester: req.payload._id });
    const asRecipient = await Connection.find({ recipient: req.payload._id });
    const response = [...asRequester, ...asRecipient];
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const recipientId = req.body.recipient;
    const existing = await Connection.findOne({
      requester: recipientId,
      recipient: req.payload._id,
    });
    if (existing) {
      existing.status = "accepted";
      await existing.save();
      res.status(200).json({ match: true, connection: existing });
    } else {
      const newConnection = await Connection.create({
        requester: req.payload._id,
        recipient: recipientId,
        status: "pending",
      });
      res.status(201).json({ match: false, connection: newConnection });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", verifyToken, async (req, res, next) => {
  try {
    const updatedConnection = {
      requester: req.body.requester,
      recipient: req.body.recipient,
      destination: req.body.destination,
      status: req.body.status,
    };
    const response = await Connection.findByIdAndUpdate(
      req.params.id,
      updatedConnection,
    );

    res.status(200).json({ message: "Connection updated" });
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
