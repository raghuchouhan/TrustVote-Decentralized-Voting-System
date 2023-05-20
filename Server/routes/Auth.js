const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "123456"
const User = require("../models/candidate")
const Admin = require("../models/admin");
const { application } = require('express');

router.post("/register",async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : hashedPassword,
            walletaddress : req.body.walletaddress
        })
        // console.log(newUser)

        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
});

//LOGIN
router.post("/login", async(req, res)=>{
    const  {email,password} = req.body

    User.findOne({email:email}).then(savedUser =>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Password or Email"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,firstName,lastName,email,walletaddress} =savedUser
                res.json({token,user:{_id,firstName,lastName,email,walletaddress}})

            }
            else{
                return res.status(422).json({error:"invalid Email or Password"})
            }
        }).catch(err=>{
            console.log(err)
        })
    })
});

// AMDIN REGITERATION AND LOGIN


router.post("/admin/register",async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.Password,salt)
        const newAdmin = new Admin({
            adminName:req.body.adminName,
            adminEmail:req.body.adminEmail,
            Password:hashedPassword,
            profilePicture:"",
            adminAddress:req.body.adminAddress,
            adminContract:"",
            proposal:""
        })
        const admin = await newAdmin.save();
        res.status(500).json(admin)
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
})
//LOGIN
router.post("/admin/login", async(req, res)=>{
    const  {adminEmail,Password} = req.body
    console.log(req.body)

    Admin.findOne({adminEmail:adminEmail}).then(savedUser =>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Password or Email"})
        }
        bcrypt.compare(Password,savedUser.Password).then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,adminName,adminEmail,adminAddress,adminContract,proposal,profilePicture} =savedUser
                res.status(200).json({token,user:{_id,adminName,adminEmail,adminAddress,adminContract,proposal,profilePicture}})

            }
            else{
                return res.status(422).json({error:"invalid Email or Password"})
            }
        }).catch(err=>{
            console.log(err)
        })
    })
});

router.get("/checktoken/:token",async(req,res)=>{
    try{
        console.log(req.params.token)
        jwt.verify(req.params.token,JWT_SECRET,(err,payload)=>{
            if(err){
                return res.status(02).json({error:"you must be logged in"})
    
            } 
            else{
                res.send(true)
            }
        })

    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }

});


module.exports = router