const User = require("../model/User");
const CryptoJS = require("crypto-js");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//register
const registerUser = async (req,res) => {
    try{
        for(const input of Object.values(req.body)){
            if(!input){
                throw Error("Completati toate campurile")
            }
        }
        if(!validator.isEmail(req.body.email)){
            throw Error("Not a valid email")
        }
        if(!validator.isStrongPassword(req.body.password)){
            throw Error("Use a strong password")
        }
        const newUser = new User({
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.SEC_PHRASE).toString(),
            last_name:req.body.last_name,
            first_name:req.body.first_name,
            cnp:req.body.cnp,
        })
        const savedUser = await newUser.save();

        const user = {
            id:savedUser._id,
            email:savedUser.email,
            last_name:savedUser.last_name,
            first_name:savedUser.first_name,
            cnp:savedUser.cnp
        }
        const token = jwt.sign({
            id:savedUser._id,
        },
        process.env.JWT_PHRASE);

        return res.status(200).json({user,token});
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }

}

const loginUser = async (req,res) => {
    try{
        console.log("register called")
        const foundUser = await User.findOne({email:req.body.email});
        console.log(foundUser);
        if (!foundUser){
            return res.status(401).json("Email doesnt exist")
        }

        const foundPassword = CryptoJS.AES.decrypt(foundUser.password,process.env.SEC_PHRASE).toString(CryptoJS.enc.Utf8);
        if (foundPassword != req.body.password){
            return res.status(401).json("Incorrect password")
        }

        const user = {
            id:foundUser._id,
            email:foundUser.email,
            last_name:foundUser.last_name,
            first_name:foundUser.first_name,
            cnp:foundUser.cnp
        }
        const token = jwt.sign({
            id:foundUser._id,
        },
        process.env.JWT_PHRASE);

        return res.status(200).json({user,token});
    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports = {registerUser,loginUser};