import { ConvContext } from "../context/conversationContext";
import {useContext} from "react"

const useConvContext = () => {
    return useContext(ConvContext); 
}

export default useConvContext;