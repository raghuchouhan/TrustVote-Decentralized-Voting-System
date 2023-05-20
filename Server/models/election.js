const mongoose = require("mongoose");

const ElectionSchema = new mongoose.Schema(
    {
        adminName:{
            type:String,
            require:true
        },
        proposal:{
            type:String,
            require:true
        },
        contractAddress:{
            type:String,
            require:true
        }
    }
)
module.exports = mongoose.model('election',ElectionSchema)
