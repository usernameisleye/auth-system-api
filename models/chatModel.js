const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        required: true
    },
    user_message: {
        type: String,
        required: true
    },
    chat_role: {
        type: String,
        required: true
    },
    chat_message: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);