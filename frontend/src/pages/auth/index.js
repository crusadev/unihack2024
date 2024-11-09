import { Navigate, Outlet } from "react-router-dom";
import "./index.css"
import LogoPrimarie from "../../assets/imgs/logo-primarie.png"
import useAuthContext from "../../react-logic/hooks/useAuthContext";

const AuthPage = () => {
    const {user} = useAuthContext()
    return (
        !user ?
        <>
            <div className="auth-page">
                <div className="form-container">
                    <img src={LogoPrimarie} className="logo-form" />
                    <Outlet />
                </div>
            </div>
        </>
        :
        <Navigate to="/home" />
    )
}

export default AuthPage;