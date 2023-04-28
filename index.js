require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect To Database
mongoose.connect(process.env.DB_STRING)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is connected to database and running on port ${ process.env.PORT }`);
        });
    })
    .catch((error) => {
        console.error(`Error connnecting to MongoDB: ${ error.message }` );
    });

// Middlewares
app.use(cors());
app.use(express.json());

// Main routes
app.use("/api/gpt", chatRoutes);
app.use("/api/user", userRoutes);