const Conversation = require("../model/Conversation");
const axios = require("axios")

const getConversation = async (req,res) => {
    try{
        console.log(req.params.conversation_id)
        let returnConversation = await Conversation.findById(req.params.conversation_id)
        res.status(200).json(returnConversation);
    }catch(err){
        res.status(500).json(err.message);
    }
}

const getAllUserConversations = async (req,res) => {
    try{
        const {client_id} = req.params
        const {page} = req.query || 0;
        const convPerPage = 6;
        const conversations = await Conversation.find({client_id:client_id}).sort({createdAt:-1}).skip(page*convPerPage).limit(convPerPage).select("last_message createdAt");
        const number = await Conversation.find({client_id}).countDocuments()
        console.log(number)
        res.status(200).json({conversations,number});
    }catch(err){
        res.status(500).json(err.message)
    }
}

const getAllConversations = async (req,res) => {
    try{
        const {page} = req.query || 0;
        const convPerPage = 6;
        const conversations = await Conversation.find().skip(page*convPerPage).limit(convPerPage).select("last_message createdAt");
        console.log("all conversations: " + conversations)
        res.status(200).json(conversations);
    }catch(err){
        res.status(500).json(err.message)
    }
}

const postConversation = async (req,res) => {
    try{    
        //Acest endpoint se va apela cand utilizatorul primite primul mesaj intr o conversatie
        //const response = axios... comunicare cu AI pentru a primi raspuns
        const {client_id,prompt} = req.body
        console.log(client_id, prompt)
        const ai_response = await axios.post(`${process.env.AI_URL}/prompt`,{
            prompt
        })
        const newConversation = new Conversation({
            client_id,
            messages:[{
                sent_date: new Date(),
                prompt:req.body.prompt,
                //files:req.body.files
                //response:response.data...
                response:ai_response.data,
            }],
            last_message:{
                text:req.body.prompt,
                sent_date:new Date()
            }
        })
        const savedConversation = await newConversation.save();
        const testing = await Conversation.findById(savedConversation._id)
        console.log(testing)
        res.status(200).json(savedConversation)
    }catch(err){
        console.log(err.message)
        res.status(400).json(err.message)
    }
}

const postMessage = async (req,res) => {
    try{
        //De adaugat fisiere, de adaugat response
        const {conversation_id} = req.params;
        const {prompt} = req.body
        //const response = axios... comunicare cu AI pentru a primi raspuns
        const ai_response = await axios.post(`${process.env.AI_URL}/prompt`,{
            prompt
        })
        const new_message = {
            sent_date: new Date(),
            prompt:req.body.prompt,
            //files:req.body.files
            //response:response.data...
            response:ai_response.data,
        }
        await Conversation.findByIdAndUpdate(conversation_id,{
            $push:{
                messages:new_message
            }
        })
        console.log("push succesful")
        await Conversation.findByIdAndUpdate(conversation_id,{
            last_message:{
                text:req.body.prompt,
                sent_date:new Date(),
            }
        })
        console.log("last_message")
        res.status(200).json(new_message)
    }catch(err){
        console.log(err.message)
        res.status(500).json(err.message)
    }
}

module.exports = {getConversation,getAllConversations,postMessage,postConversation,getAllUserConversations};