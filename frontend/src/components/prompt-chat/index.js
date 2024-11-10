import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "./index.css"
import useMessagesContext from "../../react-logic/hooks/useMessagesContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import useAuthContext from "../../react-logic/hooks/useAuthContext";
import useConvContext from "../../react-logic/hooks/useConvContext";
import useSendFiles from "../../react-logic/hooks/useSendFiles";

const Prompt = () => {
    const prompt_ref = useRef(null);
    const location = useLocation();
    const conversation_id = location.pathname.split("/").pop()
    const navigate = useNavigate();
    const {dispatch} = useMessagesContext();
    const {dispatch:conversationsDispatch} = useConvContext()
    const {user} = useAuthContext()
    const files_ref = useRef(null)
    const {sendFiles} = useSendFiles();
    const handleSend = async () => {
        if(conversation_id != "new"){
            const prompt = prompt_ref.current.value;
            prompt_ref.current.value = "";
            if(files_ref.current.files.length != 0){
                sendFiles(files_ref.current.files)
            }
            files_ref.current.files = null
            dispatch({type:"UNSOLVED_MESSAGE",payload:{
                prompt
            }})
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/conversations/${conversation_id}`,{
                prompt
            })
            console.log(result.data)
            dispatch({type:"SOLVE_MESSAGE",payload:result.data})
        }else{
            const prompt = prompt_ref.current.value
            prompt_ref.current.value = "";
            if(files_ref.current.files.length != 0){
                sendFiles(files_ref.current.files)
            }
            files_ref.current.files = null
            dispatch({type:"UNSOLVED_MESSAGE",payload:{
                prompt
            }})
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/conversations`,{
                client_id:user.id,
                prompt
            })
            conversationsDispatch({type:"ADD_CONVERSATION",payload:result.data})
            dispatch({type:"SOLVE_MESSAGE",payload:result.data.messages[0]})
            navigate(`/home/chat/${result.data._id}`);
        }
    }
    return (
        <div className="prompt-container">
            <input ref={files_ref} type="file" multiple={true} style={{display:"none"}}/>
            <FontAwesomeIcon icon={faPaperclip} className="file-icon" onClick={() => files_ref.current.click()}/>
            <input ref={prompt_ref} type="text" placeholder="Scrie Aici..." className="prompt-input"/>
            <FontAwesomeIcon icon={faArrowUp} className="send-prompt" onClick={() => handleSend()}/>
        </div>
    )
}

export default Prompt;