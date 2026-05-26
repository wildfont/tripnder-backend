try {
  process.loadEnvFile(__dirname + "/.env");
} catch (error) {
  console.warn(".env file not found, using default environment values");
}

const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./db");
const app = require("./app");
const Message = require("./models/message.model.js");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.ORIGIN || "http://localhost:5173" }
});

io.on("connection", (socket) => {
  socket.on("join_room", (connectionId) => {
    socket.join(connectionId);
  });

  socket.on("send_message", async ({ connectionId, senderId, text }) => {
    try {
      const message = await Message.create({ connection: connectionId, sender: senderId, text });
      io.to(connectionId).emit("new_message", message);
    } catch (err) {
      console.error(err);
    }
  });
});

async function startServer() {
  await connectDB();
  server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
}
startServer();