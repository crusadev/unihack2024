import axios from "axios"
import { useRef, useState } from "react"
import useAuthContext from "../hooks/useAuthContext";
import validator from "validator"
import {useNavigate} from "react-router-dom"

const useLogin = () => {
    const [error,setError] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const {setUser,setToken} = useAuthContext();
    const navigate = useNavigate();
    const form_ref = {
        email_ref:useRef(null),
        password_ref:useRef(null),
    }
    const handleSubmit = async () => {
        if(!form_ref.email_ref.current.value || !form_ref.password_ref.current.value){
            setError("Completati toate campurile!")
        }
        if(!validator.isEmail(form_ref.email_ref.current.value)){
            setError("Email invalid");
        }
        setIsLoading(true);
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`,{
            email:form_ref.email_ref.current.value,
            password:form_ref.password_ref.current.value
        });
        if (result.status == 200){
            setIsLoading(false);
            setToken(result.data.token);
            setUser(result.data.user);
            navigate("/home");
        }else{
            setError("Something went wrong, try again")
        }
    }
    return {
        handleSubmit,
        error,
        isLoading,
        form_ref}
}

export default useLogin;