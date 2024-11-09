import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./index.css"
import useMessagesContext from "../../react-logic/hooks/useMessagesContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const Prompt = () => {
    const prompt_ref = useRef(null);
    const location = useLocation();
    const conversation_id = location.pathname.split("/").pop()
    const {dispatch} = useMessagesContext();
    const handleSend = async () => {
        dispatch({type:"UNSOLVED_MESSAGE",payload:{
            prompt:prompt_ref.current.value
        }})
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/conversations/${conversation_id}`,{
            prompt:prompt_ref.current.value
        })
        console.log(result.data)
        dispatch({type:"SOLVE_MESSAGE",payload:result.data})
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