const express = require('express');
const { configureCors } = require('./cors/config');
const { dbConnect } = require('./db/dbConnect');
const wsServer = require('./wsserver');
require('dotenv').config();


/** __init__ */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(configureCors());


/** database__init__ */
dbConnect()



app.get("/",(req,res)=>{return res.status(200).json({message:"api/v1"})})


/**
 * @listens process.env.PORT
 */
app.listen(process.env.PORT, () => {
    console.log('Server is running on port',process.env.PORT);
});




