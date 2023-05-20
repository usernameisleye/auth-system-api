const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt"); 

const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    username: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true
    }
}, { 
    timestamps: true
});

// Hash password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    };

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.compare = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);