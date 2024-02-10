const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Connection } = require('./config/db');
const { articleRouter } = require('./routes/articles.route');

const app = express();

// handle and use cors 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/article', articleRouter)


app.get('/', async (req, res) => {
    try {
        console.log("Hi server is live!");
    } catch (error) {
        console.log(error);
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, async (req, res) => {
    try {
        await Connection;
        console.log("MongoDB Connected...");
    } catch (error) {
        console.log("MongoDB not connected!");
        console.log(error);
    }
})
