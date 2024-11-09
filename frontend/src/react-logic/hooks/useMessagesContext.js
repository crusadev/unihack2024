import {useContext} from "react"
import { MessagesContext } from "../context/messagesContext";

const useMessagesContext = () => {
    return useContext(MessagesContext); 
}

export default useMessagesContext;