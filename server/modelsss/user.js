const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    number: Number,
    email: { type: String, unique: true },
    password: String,
    googleId: { type: String, required: false },
    wallet: { type: Number, default: 0 },
    status: { type: Boolean, default: true }, 
})

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
