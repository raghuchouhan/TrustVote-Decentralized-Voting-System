const mongoose = require('mongoose');
const CandidateSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        require:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:6
    },
    walletaddress:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('User',CandidateSchema)