// backend/routes/financialRecords.js
const express = require('express');
const router = express.Router();
const FinancialRecord = require('../models/FinancialRecord');
const Property = require('../models/Property');

router.post('/add-financial-data', async (req, res) => {
  try {
    const { property_id, income, expenses,  } = req.body;
    if (!property_id || income === undefined || expenses === undefined ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const property = await Property.findById(property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const net_profit = income - expenses;
    const newFinancialRecord = new FinancialRecord({
      property_id,
      income,
      expenses,
      net_profit,
    });

    const financialRecord = await newFinancialRecord.save();
    res.status(201).json(financialRecord);
  } catch (error) {
    console.error('Error adding financial record:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const financialRecords = await FinancialRecord.find().populate('property_id', 'property_name');
    res.json(financialRecords);
  } catch (error) {
    console.error('Error fetching financial records:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const financialRecord = await FinancialRecord.findById(req.params.id);
    if (!financialRecord) {
      return res.status(404).json({ message: 'Financial record not found' });
    }

    await financialRecord.remove();
    res.json({ message: 'Financial record removed' });
  } catch (error) {
    console.error('Error deleting financial record:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
