const app = require("./app");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// Configs
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
} else {
  dotenv.config({ path: "backend/config/config.env" });
}

connectDB();
// Cloudinary configs
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to uncaught exceptions");
  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down the server due to unhandled promises");
  server.close(() => {
    process.exit(1);
  });
});
