require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

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


// Routes