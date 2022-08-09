require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3000;
// outer imports
const productRoutes = require("./Routes/route");
const connectFunction = require("./db/connect");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/errorHandler");
require("express-async-errors");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

// Routes
app.use("/api/v1/products", productRoutes);

// Errors handler middleware
app.use(notFound);
app.use(errorHandler);

// connect db

const start = async () => {
  try {
    await connectFunction(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`app is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
