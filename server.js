const mongoose = require("mongoose");
const dotenv = require("dotenv");

// uncaught exception handler
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION. SHUTTING DOWN...");
  console.log(err.name, err.message);
  process.exit(1);
});

// config and express app
dotenv.config({ path: "./config.env" });
const app = require("./app");

// databse connection
const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DATABASE CONNECTION SUCCESSFUL"));

// server setup
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`LISTENING FOR REQUEST ON PORT ${port}`);
});

// unhandled rejection handler
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION. SHUTTING DOWN...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
