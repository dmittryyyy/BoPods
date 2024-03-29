require('dotenv').config()
const express = require('express');
const sequelize = require('./db');

const PORT = process.env.PORT || 5000

const app = express();
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));