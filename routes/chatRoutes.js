const express = require("express");
const router = express.Router();
// Controllers
const {
    get_all_chats,
    send_chat,
    get_chat,
    delete_chat,
    update_chat
} = require("../controllers/chatController");
const chatAuthMiddleware = require("../middleware/chatAuthMiddleware");

//Auth middleware🚧  
router.use(chatAuthMiddleware());

// Routes
router.get("/", get_all_chats);

router.send("/", send_chat);

router.get("/:id", get_chat);

router.delete("/:id", delete_chat);

router.patch("/:id", update_chat);
