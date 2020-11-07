const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path : './config.env'});

const connectMongo = async() => {
    try{
     await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI,{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex : true } );
     console.log(process.env.MONGO_URI);
     console.log("DB connected");
    }
    catch(e)
    {
        console.log(e);
        throw e;
    }
}

module.exports = connectMongo;