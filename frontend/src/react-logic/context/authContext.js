import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios"

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("user")));
useEffect(() => {
    if(token){
        axios.defaults.headers.common["Authorization"] = token;
        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(user));
    }else{
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
},[token,user])

const tokenState = useMemo(
    () => ({
      token,
      setToken,
      user,
      setUser,
    }),
    [token]
  );

    return(
        <AuthContext.Provider value={tokenState}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;