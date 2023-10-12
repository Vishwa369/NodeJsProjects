const express = require('express');
const path = require('path');
const app = express();
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const hbs = require('hbs');

app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.urlencoded({ extended: false }));

app.use(signupRoutes);
app.use(loginRoutes);

app.listen(3000, () => {
    console.log("server running at PORT:3000");
});
