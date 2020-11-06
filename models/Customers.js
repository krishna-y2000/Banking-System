const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name : {
        type: String
    },
    email : {
        type : String
    },
    currentBalance : {
        type: Number
    } ,
    accountNo : {
         type: Number  ,
        required : true,
        unique: true
    } ,
    age : {
        type: Number
    } ,
    gender : {
        type: String
    } ,

})

module.exports = mongoose.model('customers',customerSchema );
