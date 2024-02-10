const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const { expenseModal } = require('./Schema/expenseSchema');
const { Connection } = require('./db');
const app = express();

// Enable CORS for all domains
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const expenses = await expenseModal.find();
    if (expenses) {
        res.send({ message: "Expenses", expenses: expenses });
    } else {
        res.send({ message: "Expenses Not Found", expenses: expenses });
    }
})

app.post('/createExpense', async (req, res) => {

    const { title, amount } = req.body;
    const expense = new expenseModal({
        title,
        amount
    });

    await expense.save();
    res.send({
        message: "Expense add success", expense: expense
    });
})





// Connect to MongoDB database using Mongoose.

// const PORT = process.env.PORT || 7979;

app.listen(7979, async (req, res) => {
    try {
        await Connection;
        console.log('Connected to MongoDb...')
    } catch (error) {
        console.log(error.message)
    }
})