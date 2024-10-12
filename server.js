const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3003;
app.use(cors());
app.use(bodyParser.json());

const propertiesRoute = require('./src/routes/properties');
const financialRecordsRoute = require('./src/routes/financialRecords');

app.use('/api/properties', propertiesRoute);
app.use('/api/financial-records', financialRecordsRoute);


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("databases conneced"))
.catch((error) => console.log("Error",error))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});