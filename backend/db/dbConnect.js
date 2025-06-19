const mongoose = require('mongoose');
require('dotenv').config();

/**
 * @function ConnectToMongoDB 
 */
module.exports.dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            connectTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        })
        .then(()=>{
            console.log('Database connected successfully');
        })
    }
    catch (err){
        console.error("Internal Server Error: " + err.message);
        process.exit(1)
    }
}

