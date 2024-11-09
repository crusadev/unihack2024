import axios from "axios"
import { useRef, useState } from "react"
import useAuthContext from "./useAuthContext";
import validator from "validator"
import {useNavigate} from "react-router-dom"


const useRegister = () => {
    const [error,setError] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const {setUser,setToken} = useAuthContext();
    const navigate = useNavigate();
    const form_ref = {
        email_ref: useRef(null),
        password_ref: useRef(null),
        cnp_ref: useRef(null),
        first_name_ref: useRef(null),
        last_name_ref: useRef(null),
    }
    const handleSubmit = async () => {
        for(const ref of Object.values(form_ref)){
            if(!ref.current.value){
                setError("Completati toate campurile")
            }
        }

        if(!validator.isEmail(form_ref.email_ref.current.value)){
            setError("Email invalid");
        }

        setIsLoading(true);
        const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/register`,{
            email:form_ref.email_ref.current.value,
            password:form_ref.password_ref.current.value,
            cnp:form_ref.cnp_ref.current.value,
            first_name:form_ref.first_name_ref.current.value,
            last_name:form_ref.last_name_ref.current.value
        });
        console.log(result)
        if (result.status == 200){
            setIsLoading(false);
            setToken(result.data.token);
            setUser(result.data.user);
            navigate("/home");
        }
    }
    return {
        handleSubmit,
        error,
        isLoading,
        form_ref}
}

export default useRegister;