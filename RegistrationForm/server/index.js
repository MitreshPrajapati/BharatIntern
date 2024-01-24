const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Connection } = require('./db');
const { UserModel } = require('./User.model');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());




app.get('/', (req, res) => {
    res.send(" server connected")
})



app.post('/register', async (req, res) => {
    const userData = req.body;
    const { emailId } = req.body;

    try {
        const isPresent = await UserModel.findOne({ emailId });

        if (isPresent) {
            res.send({ message: "User already exists." });
        } else {
            const newUser = new UserModel({ ...userData });
            await newUser.save();
            res.send({ message: "User registerd successfully." })
        }

    } catch (error) {
        res.send({ message: error.message })
    }
})


const PORT = process.env.PORT || 7081;
app.listen(PORT, async () => {
    try {
        await Connection;
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log("Oops!!... Connection Failed.");
        console.log(error);
    }
})
