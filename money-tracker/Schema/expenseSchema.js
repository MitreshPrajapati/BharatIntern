const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: { type: 'string', required: true },
    amount: { type: 'number', required: true }
})
const expenseModal = new mongoose.model('expense', expenseSchema);
module.exports = { expenseModal };
