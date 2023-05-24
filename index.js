require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect To Database
(async function db(){
    await connectDB(app);
})();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Main routes
app.use("/api/gpt", chatRoutes);
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
    console.log(err.message);

    res.status(500)
    .json({
        error: err.message
    });
    next();
})