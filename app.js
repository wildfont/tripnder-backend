const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter)





module.exports = app