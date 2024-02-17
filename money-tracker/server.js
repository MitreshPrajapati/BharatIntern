const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const { expenseModal } = require('./Schema/expenseSchema');
const { Connection } = require('./db');
const app = express();

// Enable CORS for all domains
app.use(cors());
app.use(express.json());

// get all present expense data from the database 
// and send it as a response to the client
app.get('/', async (req, res) => {
    const expenses = await expenseModal.find();
    if (expenses) {
        res.send({ message: "Expenses", expenses: expenses });
    } else {
        res.send({ message: "Expenses Not Found", expenses: expenses });
    }
})

// add expense and send it as a response to the client
app.post('/createExpense', async (req, res) => {
    console.log(req.body)
    const { title, amount, expenseType } = req.body;
    const expense = new expenseModal({
        title,
        amount,
        expenseType
    });

    await expense.save();
    res.send({
        message: "Expense add success", expense: expense
    });
})

// expense deleteById and send  a success message or error message
app.delete('/remove', async (req, res) => {
    console.log(req.body);
    const { id } = req.body;
    let result = await expenseModal.findByIdAndDelete(id);
    if (!result) return res.status(404).send("No Record found");
    res.send({ message: `Record with ${result.title} is deleted` })
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