const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
router.post('/add-data', async (req, res) => {
  try {
    const {
      owner_name,
      property_name,
      total_units,
      filled_units,
      vacant_units,
      occupancy_rate,
      last_maintenance_date,
    } = req.body;
    const calculated_vacant_units = total_units - filled_units;
    const newProperty = new Property({
      owner_name,
      property_name,
      total_units,
      filled_units,
      vacant_units: vacant_units || calculated_vacant_units,
      occupancy_rate,
      last_maintenance_date,
    });


    const property = await newProperty.save();
    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
