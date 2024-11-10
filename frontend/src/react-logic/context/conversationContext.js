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
        case "ADD_CONVERSATION":
            return{
                conversations:[
                    action.payload,
                    ...state.conversations.slice(0,5),
                ]
            }
        default:
            return state
    }
}

const ConvProvider = ({children}) => {
    const [error,setError] = useState(false);
    const {user} = useAuthContext();
    const [isLoading,setIsLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [maxPages,setMaxPages] = useState(0);
    const [state,dispatch] = useReducer(ConvReducer,{
        conversations:[]
    })
    useEffect(() => {
        (
            async () => {
                console.log("conv effect")
                setIsLoading(true);
                const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/conversations/get_user/${user.id}/?page=${currentPage - 1}`)
                if(result.status == 200){
                    dispatch({type:"SET_CONVERSATIONS",payload:result.data.conversations})
                    console.log("ceil: " + (Math.ceil(result.data.number/6)))
                    setMaxPages(Math.ceil(result.data.number/6))
                }else{
                    setError("Something went wrong fetching conversations")
                }
                setIsLoading(false)
            }
        )()
    },[currentPage])

    return(
        <ConvContext.Provider value={{error,conversations:state.conversations,maxPages,dispatch,isLoading,error,currentPage,setCurrentPage}}>
            {children}
        </ConvContext.Provider>
    )
}

export default ConvProvider;