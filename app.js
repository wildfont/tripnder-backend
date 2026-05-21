const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.routes");
app.use("/users", userRouter);

const destinationRouter = require("./routes/destination.routes");
app.use("/destinations", destinationRouter);

const connectionRouter = require("./routes/connection.routes");
app.use("/connections", connectionRouter);

module.exports = app;
