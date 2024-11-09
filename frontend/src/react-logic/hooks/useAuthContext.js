import { AuthContext } from "../context/authContext";
import {useContext} from "react"

const useAuthContext = () => {
    return useContext(AuthContext); 
}

export default useAuthContext;