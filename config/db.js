const mongoose = require('mongoose');
require('dotenv').config()
const connectMongo = async() => {
    try{
     await mongoose.connect(process.env.MONGODB_URI , "mongodb://localhost:27017/dummyData", {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true});
     console.log("DB connected");
    }
    catch(e)
    {
        console.log(e);
        throw e;
    }
}

module.exports = connectMongo;