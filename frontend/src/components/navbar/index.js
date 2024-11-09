import "./index.css"
import Graph from "../../assets/imgs/graph.png"
import Cloud from "../../assets/imgs/vector.png"
import Prompt from "../../assets/imgs/prompt.png"
import Logo from "../../assets/imgs/logo-primarie.png"
import { Link } from "react-router-dom"


const Navbar = () => {
    const links = [
        {
            path:"/home/chat",
            display:"Chat",
            image:Prompt
        },
        {
            path:"/home/cloud",
            display:"Fisiere",
            image:Cloud
        },
        {
            path:"/home/graph",
            display:"Graph",
            image:Graph
        }
    ]
    return (
        <>
        <div className="navbar-logo-container">
            <img src={Logo} className="navbar-logo-image" />
            <div className="navbar-logo-title">AADMP TIMISOARA</div>
        </div>
        <div className="navbar-links-container">
            {links.map((link) => (
                <Link to={link.path} className="navbar-button">
                    <img src={link.image} className="navbar-image" />
                    <div className="empty"></div>
                    <div className="navbar-display">{link.display}</div>
                </Link>
            ))}
        </div>
        </>
    )
}

export default Navbar;