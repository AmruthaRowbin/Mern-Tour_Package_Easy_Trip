const mongoose = require('mongoose')
const { Schema } = mongoose;

const AgentSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    approved: {
        type: Boolean,
        default: false,
    },
    googleId: { type: String, required: false },
    status: { type: Boolean, default: true }, 
})

const AgentModel = mongoose.model('Agent', AgentSchema);
module.exports = AgentModel;
