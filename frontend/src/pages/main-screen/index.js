import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import "./index.css"

const MainScreen = () => {

    return (
        <div className="main-page">
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="main-show-container">
                <Outlet />
            </div>
        </div>
    )
}

export default MainScreen;