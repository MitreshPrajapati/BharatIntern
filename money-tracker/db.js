const mongoose = require('mongoose');
require('dotenv').config();

// const Connection = mongoose.connect(process.env.MONGO_URL);
const Connection = mongoose.connect('mongodb://localhost:27017/bi-money-tracker');
module.exports = { Connection };