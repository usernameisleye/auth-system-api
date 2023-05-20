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

router.use(chatAuthMiddleware);
// Routes
router
.route("/")
.get(get_all_chats)
.post(send_chat)

router
.route(":/id")
.get(get_chat)
.delete(delete_chat)
.patch(update_chat)

module.exports = router;
