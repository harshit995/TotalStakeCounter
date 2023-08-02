require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./db/db.js');
const cors = require("cors");
const router = require("./routes/userRoutes")
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(router);

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
