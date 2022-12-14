// Require packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Configure dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to mongoDB server
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/users')
app.use('/users',userRouter)

app.listen(port,()=>{
    console.log(`server runuin on port : ${port}`);
}); 