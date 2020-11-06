const mongoose = require('mongoose');

const tSchema = mongoose.Schema({
    fromAc : {
        type : String
    },
    toAc : {
        type : String
    },
    tAmount : {
        type : Number
    }
})

module.exports = mongoose.model('transfers', tSchema );