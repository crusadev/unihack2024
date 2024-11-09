import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import axios from "axios"
import useAuthContext from "../hooks/useAuthContext"

export const ConvContext = createContext();

export const ConvReducer = (state,action) => {
    switch(action.type){
        case "SET_CONVERSATIONS":
            return{
                conversations:action.payload
            }
        default:
            return state
    }
}

const ConvProvider = ({children}) => {
    const [error,setError] = useState(false);
    const {user} = useAuthContext();
    const [isLoading,setIsLoading] = useState(false);
    const [state,dispatch] = useReducer(ConvReducer,{
        conversations:[]
    })
    useEffect(() => {
        (
            async () => {
                setIsLoading(true);
                const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/conversations/get_user/${user.id}`)
                if(result.status == 200){
                    dispatch({type:"SET_CONVERSATIONS",payload:result.data})
                }else{
                    setError("Something went wrong fetching conversations")
                }
                setIsLoading(false)
            }
        )()
    },[])

    return(
        <ConvContext.Provider value={{error,conversations:state.conversations,isLoading,error}}>
            {children}
        </ConvContext.Provider>
    )
}

export default ConvProvider;