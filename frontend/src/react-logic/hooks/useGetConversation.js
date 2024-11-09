import axios from "axios";
import { useEffect, useState } from "react"

const useGetConversation = (id) => {
    const [conversation,setConversation] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(false);
    useEffect(() => {
        ( async () => {
            setIsLoading(true);
            const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/conversations/get_one/${id}`);
            if(result.status == 200){
                setConversation(result.data)
                console.log("conv hook " + JSON.stringify(conversation) )
                setIsLoading(false)
            }else{
                setError("Problem fetching chat")
                setIsLoading(false)
            }
    })()
    },[])
    return {isLoading,conversation,error}
}

export default useGetConversation;