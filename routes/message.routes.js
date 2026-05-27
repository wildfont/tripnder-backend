const router = require("express").Router();

const Message = require("../models/Message.model.js");

const verifyToken = require("../middleware/auth.middlewares");

router.get("/:connectionId", verifyToken, async (req, res, next) => {
  try {
    const messages = await Message.find({
      connection: req.params.connectionId,
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
