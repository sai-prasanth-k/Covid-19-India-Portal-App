const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const connectToDB = require('./connectToDB/connectToDB');
const userRoutes = require('./routes/users');
const stateRoutes = require('./routes/states');
const districtRoutes = require('./routes/districts');

const app = express();
app.use(express.json());

connectToDB();

app.use('/api/users', userRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/districts', districtRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));