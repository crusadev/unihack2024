import "./index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import useAuthContext from "../../react-logic/hooks/useAuthContext"
import useLogout from "../../react-logic/hooks/useLogout"
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const {user} = useAuthContext();
    const {logout} = useLogout();
    const navigate = useNavigate();
    return (
        <>
        <h3 className="screen-header">Profile Info</h3>
        <div className="profile-image-container">
            <FontAwesomeIcon icon={faUser} className="profile-image"/>
        </div>
        <div className="profile-data-container">
            {Object.entries(user).map((entries,index) => (
                !(entries[0] == "id") ?
                <div key={index} className="user-data">{entries[1]}</div>
                :
                null
            ))}
        </div>
        <div className="profile-buttons-container">
            <div className="back-button" onClick={() => navigate("/home/chat")}>Back</div>
            <div className="logout-button" onClick={() => logout()}>Logout</div>
        </div>
        </>
    )
}

export default Profile;