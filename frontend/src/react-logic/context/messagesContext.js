import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import axios from "axios"
import useAuthContext from "../hooks/useAuthContext"

export const MessagesContext = createContext();

export const MessagesReducer = (state,action) => {
    switch(action.type){
        case "SET_MESSAGES":
            return {
                messages:action.payload
            }
        case "UNSOLVED_MESSAGE":
            return {
                messages:[
                    ...state.messages,
                    {
                        ...action.payload,
                        response:"Loading...",
                        unsolved:true,
                    }
                ]
            }
        case "SOLVE_MESSAGE":
            return {
                messages:state.messages.map((message) => 
                    message.unsolved ? 
                    {
                        ...action.payload,
                        unsolved:false
                    }
                    :
                    message
                )
            }
        default:
            return state
    }
}

const MessagesProvider = ({children}) => {
    const [error,setError] = useState(false);
    const {user} = useAuthContext();
    const [state,dispatch] = useReducer(MessagesReducer,{
        messages:[]
    })

    return(
        <MessagesContext.Provider value={{error,messages:state.messages,dispatch}}>
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesProvider;