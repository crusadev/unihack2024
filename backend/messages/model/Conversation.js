const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    client_id:{
        type:String,
        required:true
    },
    messages:[{
        prompt:{
            type:String
        },
        files:{
            type:Schema.Types.Mixed
        },
        response:{
            type:String
        },
        response_files_url:{
            type:[{
                type:String
            }]
        },
        sent_date:Date,
        _id:false
    }],
    last_message:{
        text:{
            type:String
        },
        sent_date:Date
    },
},{timestamps:true})

const Conversation = mongoose.model("Conversation",ConversationSchema);

module.exports = Conversation;