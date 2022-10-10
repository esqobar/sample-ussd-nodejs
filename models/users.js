const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    fullname: { type: String, required: true},
    idNumber: { type: Number, required: true},
})

const User = mongoose.model('User', userSchema);
module.exports = User;