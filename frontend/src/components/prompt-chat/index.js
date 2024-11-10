import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./index.css"
import useMessagesContext from "../../react-logic/hooks/useMessagesContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import useAuthContext from "../../react-logic/hooks/useAuthContext";
import useConvContext from "../../react-logic/hooks/useConvContext";

const Prompt = () => {
    const prompt_ref = useRef(null);
    const location = useLocation();
    const conversation_id = location.pathname.split("/").pop()
    const navigate = useNavigate();
    const {dispatch} = useMessagesContext();
    const {dispatch:conversationsDispatch} = useConvContext()
    const {user} = useAuthContext()
    const handleSend = async () => {
        if(conversation_id != "new"){
            dispatch({type:"UNSOLVED_MESSAGE",payload:{
                prompt:prompt_ref.current.value
            }})
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/conversations/${conversation_id}`,{
                prompt:prompt_ref.current.value
            })
            console.log(result.data)
            dispatch({type:"SOLVE_MESSAGE",payload:result.data})
            prompt_ref.current.value = "";
        }else{
            dispatch({type:"UNSOLVED_MESSAGE",payload:{
                prompt:prompt_ref.current.value
            }})
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/conversations`,{
                client_id:user.id,
                prompt:prompt_ref.current.value
            })
            conversationsDispatch({type:"ADD_CONVERSATION",payload:result.data})
            dispatch({type:"SOLVE_MESSAGE",payload:result.data.messages[0]})
            navigate(`/home/chat/${result.data._id}`);
            prompt_ref.current.value = "";
        }

    }
    return (
        <div className="prompt-container">
            <FontAwesomeIcon icon={faPaperclip} className="file-icon"/>
            <input ref={prompt_ref} type="text" placeholder="Scrie Aici..." className="prompt-input"/>
            <FontAwesomeIcon icon={faArrowUp} className="send-prompt" onClick={() => handleSend()}/>
        </div>
    )
}

export default Prompt;