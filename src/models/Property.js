const mongoose  = require("mongoose");

const PropertySchema = new mongoose.Schema({
    owner_name: {
    type: String,
    required: true,
  },
  property_name : {
    type : String,
    required : true
  },
  total_units: {
    type: Number,
    required: true,
    min: 0,
  },
  filled_units: {
    type: Number,
    required: true,
    min: 0,
  },
  vacant_units: {
    type: Number,
    required: true,
    min: 0,
  },
  occupancy_rate: {
    type: String,
    required: true,
    match: [/^\d+%$/, 'Occupancy rate must be a percentage'],
  },
  last_maintenance_date: {
    type: Date,
    required: true,
  },
}, { timestamps : true })
module.exports = mongoose.model("Property", PropertySchema)