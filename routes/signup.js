const express = require('express');
const collection = require('../database/schemaDB');

const router = express.Router();

router.get('/signup', (req,res)=>{
    res.render('signup')
})

router.post('/signup', async(req,res)=>{
    const data = new collection({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        await data.save();
        res.render('home', {name: req.body.name})
    }
    catch{
        res.send("Error saving data")
    }
})

module.exports = router;