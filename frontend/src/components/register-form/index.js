import useRegister from "../../react-logic/hooks/useRegister";
import "./index.css"
import {Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faIdCard, faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
    const {handleSubmit,error,isLoading,form_ref} = useRegister();
    return (
        <>
            <h3 className="register-title">Creare Cont</h3>
            <div className="name-container">
                <div className="input-container">
                    <div className="register-label">Prenume*:</div>
                    <FontAwesomeIcon icon={faUser} className="input-icon name-icon" color="#b4b4b4"/>
                    <input ref={form_ref.first_name_ref}
                type="text"
                className="register-input name-register"
                placeholder="Prenume" />
                </div>
                <div className="input-container">
                    <div className="register-label">Nume de familie*:</div>
                    <FontAwesomeIcon icon={faUser} className="input-icon name-icon" color="#b4b4b4"/>
                    <input ref={form_ref.last_name_ref}
                type="text"
                className="register-input name-register"
                placeholder="Nume de familie" />
                </div>
            </div>
            <div className="register-label">Email*:</div>
            <div className="input-container">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" color="#b4b4b4"/>
                <input ref={form_ref.email_ref}
            type="text"
            className="register-input"
            name="email"
            placeholder="Email" />
            </div>
            <div className="register-label">Parola*:</div>
            <div className="input-container">
                <FontAwesomeIcon icon={faLock} className="input-icon" color="#b4b4b4"/>
                <input ref={form_ref.password_ref}
            type="password"
            className="register-input"
            placeholder="Parola" />
            </div>
            <div className="register-label">Cod Numeric Personal*:</div>
            <div className="input-container">
                <FontAwesomeIcon icon={faIdCard} className="input-icon" color="#b4b4b4"/>
                <input ref={form_ref.cnp_ref}
            type="text"
            className="register-input"
            placeholder="CNP" />
            </div>
            <Link to="/auth/login" className="register-existing">Deja am cont</Link>
            <div
            className="submit-register-button"
            onClick={() => handleSubmit()}>Creare Cont</div>
        </>
    )
}

export default RegisterForm;