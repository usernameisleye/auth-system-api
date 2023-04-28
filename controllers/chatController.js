const Chat = require("../models/chatModel");

// Getting all chats 
const get_all_chats = async (req, res) => {
    const user_id = req.user._id; //Getting auth _id from req user object

    try{
        const chats = await Chat.find({user_id}).sort({createdAt: -1});
        res.status(200).json(chats);
    }
    catch(error){
        res.status(400).json(error);
    }
};

// Getting a chat (optional)
const get_chat = async (req, res) =>{
    const { id } = req.params;

    try{
        const chat = await Chat.findById(id);
        res.status(200).json(chat);
    }
    catch(error){
        res.status(400).json(error);
    }
};

// Chat System
const send_chat = async (req, res) => {
    const { message } = req.body;
    const user_id = req.user._id;

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`, //Auth header sent to openAI
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", //model type
            messages: [{
                role: "user",
                content: message
            }],
            max_tokens: 100
        })
    };

    try{
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();

        // Getting chat role and message from data obj
        const chat_role = data.choices[0].message.role;
        const chat_message = data.choices[0].message.content;

        await Chat.create({ user_id, user_role: "user", user_message: message , chat_role, chat_message });

        res.status(200).json(data);
    }
    catch(error){
        console.error(error);
        res.status(400).json(error);
    }
};

// Delete a chat(optional)
const delete_chat = async (req, res) => {
    const { id } = req.body;

    try{
        const chat = await Chat.findOneAndDelete({ _id: id });
        res.status(200).json(chat);
    }
    catch(error){
        res.status(400).json(error);
    }
};

// Update a chat(optional)
const update_chat = async (req, res) => {
    const { id } = req.body;

    try{
        const chat = await Chat.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json(chat);
    }
    catch(error){
        res.status(400).json(error);
    }
};

module.exports = {
    get_all_chats,
    get_chat,
    send_chat,
    delete_chat,
    update_chat
};