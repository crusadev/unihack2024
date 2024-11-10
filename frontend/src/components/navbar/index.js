import "./index.css"
import Graph from "../../assets/imgs/graph.png"
import Cloud from "../../assets/imgs/vector.png"
import Prompt from "../../assets/imgs/prompt.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser,faCloud,faMessage } from "@fortawesome/free-solid-svg-icons"
import Logo from "../../assets/imgs/logo-primarie.png"
import { Link } from "react-router-dom"


const Navbar = () => {
    const links = [
        {
            path:"/home/chatlist",
            display:"Chat",
            image:faMessage
        },
        {
            path:"/home/cloud",
            display:"Fisiere",
            image:faCloud
        },
        {
            path:"/home/profile",
            display:"User",
            image:faUser
        }
    ]
    return (
        <>
        <div className="navbar-logo-container">
            <img src={Logo} className="navbar-logo-image" />
            <div className="navbar-logo-title">AADMP TIMISOARA</div>
        </div>
        <div className="navbar-links-container">
            {links.map((link,index) => (
                <Link to={link.path} className="navbar-button" key={index}>
                    <FontAwesomeIcon icon={link.image} className="link-icon"/>
                    <div className="empty"></div>
                    <div className="navbar-display">{link.display}</div>
                </Link>
            ))}
        </div>
        </>
    )
}

export default Navbar;