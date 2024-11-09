const CryptoJS = require("crypto-js");
const User = require("../model/User")

const updateUser = async (req,res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SEC_PHRASE,
        ).toString();
    }
    try{
        const new_user = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})

        res.status(200).json(new_user);
    }catch(err){
        res.status(500).json(err.message)
    }
}

const deleteUser = async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted");
    }catch(err){
        res.status(500).json(err.message)
    }
}

const getUser = async (req,res) => {
    try{
        console.log(req.params.id)
        let returnUser = await User.findById(req.params.id)
        delete returnUser.password;
        console.log(returnUser)
        res.status(200).json(returnUser);
    }catch(err){
        res.status(500).json(err.message);
    }
}

const getAllUsers = async (req,res) => {
    try{
        const users = await User.find();
        const not_accepted = await User.countDocuments({accepted:false});
        console.log(not_accepted)
        res.status(200).json({users,not_accepted});
    }catch(err){
        res.status(500).json(err.message)
    }
}

const acceptUser = async (req,res) => {
    try{
        const accepted_user = await User.findByIdAndUpdate(req.params.id,{accepted:true})
        res.status(200).json(accepted_user)
    }catch(err){
        res.status(500).json(err.message)
    }
}

const editOrderLimit = async (req,res) => {
    try{
        const new_user = await User.findByIdAndUpdate(req.params.id,{
            order_limit:req.body.new_limit
        })
        res.status(200).json(new_user.order_limit)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports = {updateUser,deleteUser,getUser,getAllUsers,acceptUser,editOrderLimit};