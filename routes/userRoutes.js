const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken")

const router = express.Router();

//@route POST /api/users/register
//@desc Register a new User
//@access Public

router.post("/register",async(req,res)=>{
    const{name,email,password}=req.body;
    try {
        let user = await User.findOne({email});
        if (user)return res.status(400).json({message:"User Already exists"})

        user = new User({name , email,password});
        await user.save();
        res.status(201).json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
        
    }
})

//@route POST /api/users/login
//@desc Authenticate user
//@access Public

router.post("/login",async(req,res)=>{
    const{email,password}=res.body;
    try {
       let user = await User.findOne({email})
       if(!user){
        return res.status(400).json({message :"Invalid Credentials"})
       }
       const isMatch = await user.matchPassword(password);
       if(!isMatch){
         return res.status(400).json({message :"Invalid Credentials"})
       }

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
        
    }
})

module.exports=router