const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    age: { type: Number, required: true },
    mobileNumber: { type: String, unique: true, required: true},
    emailId: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

const UserModel = mongoose.model('user', userSchema);
module.exports = { UserModel };