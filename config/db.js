const mongoose = require("mongoose");

let PORT = process.env.PORT;
let DB_STRING = process.env.DB_STRING;

const connect = async (app) => {
    try{        
        await mongoose.connect(DB_STRING, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        });
        app.listen(PORT, () => {
            console.log(`Server connected: PORT ${PORT}`);
        });
    }
    catch(error){
        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
};

module.exports = connect;