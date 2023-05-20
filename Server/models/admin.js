const mongoose = require('mongoose');

const AdminSchema =new mongoose.Schema({

    adminName:{
        type:String,
        required:true
    },
    adminEmail:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    Password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        default:"",
    },
    adminAddress:{
        type:String,
        require:true
    },
    adminContract:{
        type:String,
        default:"",
    },
    proposal:{
        type:String,
        default:""
    }

});
module.exports = mongoose.model("Admin",AdminSchema);