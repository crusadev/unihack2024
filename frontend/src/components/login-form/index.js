import useLogin from "../../react-logic/hooks/useLogin";
import "./index.css"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {faLock} from '@fortawesome/free-solid-svg-icons'

const LoginForm = () => {
    const {handleSubmit,error,isLoading,form_ref} = useLogin();
    return (
        <>
            <h3 className="login-title">Log-In</h3>
            <div className="input-container">
                <FontAwesomeIcon
                icon={faEnvelope}
                className="input-icon"
                color="#b4b4b4"
                />
                <input
                ref={form_ref.email_ref}
                type="text"
                className="login-input login-email"
                name="email"
                placeholder="Email" />
            </div>
            <div className="input-container">
                    <FontAwesomeIcon
                    icon={faLock}
                    className="input-icon"
                    color="#b4b4b4"
                    />
                <input
                ref={form_ref.password_ref}
                type="password"
                className="login-input"
                name="password"
                placeholder="Parola" />
            </div>
            <Link to="/auth/register" className="login-not-existing">Creare Cont</Link>
            <div
            className="submit-login-button"
            onClick={() => handleSubmit()}>Log-in</div>
        </>
    )
}

export default LoginForm;