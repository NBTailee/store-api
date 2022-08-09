const mongoose = require("mongoose");

const connectFunction = (url) => {
  return mongoose.connect(url);
};

module.exports = connectFunction;
