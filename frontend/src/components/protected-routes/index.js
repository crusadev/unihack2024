import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../../react-logic/hooks/useAuthContext"

const ProtectedRoutes = () => {
    const {user} = useAuthContext()
    return(
        user ?
        <Outlet />
        :
        <Navigate to="/auth/login" />
    )
}

export default ProtectedRoutes;