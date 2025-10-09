const mongoose = require("mongoose");
require("dotenv").config();

// Change process.env.dbURL to process.env.MONGO_URI
const connection = mongoose.connect(process.env.MONGO_URI);

module.exports = { connection };
