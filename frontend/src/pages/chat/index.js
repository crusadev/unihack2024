import ChatConversation from "../../components/chat-conversation";
import Prompt from "../../components/prompt-chat";
import "./index.css"
import useConvContext from "../../react-logic/hooks/useConvContext"
import { useParams } from "react-router-dom";
import useGetConversation from "../../react-logic/hooks/useGetConversation"
import useMessagesContext from "../../react-logic/hooks/useMessagesContext"
import { useEffect } from "react";
import axios from "axios";

const ChatScreen = () => {
    const {conversation_id} = useParams();
    const {dispatch} = useMessagesContext();
    useEffect(() => {
        (async () => {
            if(conversation_id != "new"){
                const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/conversations/get_one/${conversation_id}`);
                console.log(result.data)
                dispatch({type:"SET_MESSAGES",payload:result.data.messages});
            }
        })()
    },[conversation_id])

    const {messages} = useMessagesContext();
    return (
        <>
        <div className="chat-screen">
            {
                conversation_id == "new" ? 
                <ChatConversation messages={null}/>
                :
                <ChatConversation messages={messages}/>
            }
            <Prompt />
        </div>
        </>
    )
}

export default ChatScreen;