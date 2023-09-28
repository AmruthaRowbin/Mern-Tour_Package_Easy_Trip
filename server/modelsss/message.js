const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

  Chatusers:{
    type: Array,
    require:true
  },
  message: {
    type: String,
    require:true
  },
  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    require:true
  }

}, {
    timestamps: true
});

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;


