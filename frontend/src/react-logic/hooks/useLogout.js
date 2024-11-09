import useAuthContext from "./useAuthContext"
import {useNavigate} from "react-router-dom"

const useLogout = () => {
    const {setUser,setToken} = useAuthContext();
    const navigate = useNavigate();

    const logout = () => {
        setUser(null);
        setToken(null);
        navigate("/auth/login")
    }
    return {logout}
}

export default useLogout