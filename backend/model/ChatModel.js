const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        null: false
    },
    message: {
        type: String, 
        required: true,
        null: true
    },

},{
    timestamps: true  
})

const ChatModel = mongoose.model('chats', chatSchema);
module.exports = ChatModel;