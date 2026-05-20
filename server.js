try {
    process.loadEnvFile(__dirname + "/.env");
} catch (error) {
    console.warn(".env file not found, using default environment values");
}

const connectDB = require("./db")
const app = require("./app");


async function startServer() {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
}
startServer()
