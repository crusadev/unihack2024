import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import "./index.css"
import ProfileButton from "../../components/profile-button";

const MainScreen = () => {

    return (
        <div className="main-page">
            <ProfileButton />
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