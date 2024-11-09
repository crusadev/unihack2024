import "./index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom"

const ProfileButton = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const isProfile = location.pathname.split("/").pop();
    return (
        !(isProfile == "profile") ? 
        <div className="profile-row">
                <FontAwesomeIcon
                icon={faUser}
                color="#ffffff"
                className="profile-button"
                onClick={() => navigate("/home/profile")}/>
        </div>
        :
        null
    )
}

export default ProfileButton;