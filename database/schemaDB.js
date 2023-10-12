const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
        .then(() => {console.log("Mongodb Connected")})
        .catch((err) => {console.log(err)})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email: {
        type: String,
        require: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type:String,
        require: true,
        minlength: [8, 'Minimum password length is 8 character']
    }
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const collection = new mongoose.model("collection2", userSchema)

module.exports = collection;