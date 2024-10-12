const mongoose = require('mongoose');

const FinancialRecordSchema = new mongoose.Schema({
  property_id: {
    type: Number,
    required: true,
    ref: 'Property', 
  },
  income: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
  net_profit: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FinancialRecord', FinancialRecordSchema);
