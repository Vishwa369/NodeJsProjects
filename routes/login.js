const express = require('express');
const collection = require('../database/schemaDB');
const bcrypt = require('bcryptjs');
require("dotenv").config();

const router = express.Router();

router.get('/', (req,res)=>{
    res.render('login');
});

router.post('/login',  async (req,res)=>{
    try{
        const check = await collection.findOne({email: req.body.email});

        if(!check) {
            return res.send('Email not found');
        }

        const passwordMatch = await bcrypt.compare(req.body.password, check.password);

        if(passwordMatch){
            res.render('home', {name: check.name}); // Use check.name to get the name of the user from the database.
        }
        else{
            res.send('Wrong password'); // Change from res.render to res.send
        }
    }
    catch(err){
        console.error(err);
        res.send('Error occurred while processing the request');
    }
});

module.exports = router;
