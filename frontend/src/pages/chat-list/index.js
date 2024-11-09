import "./index.css"
import useConvContext from "../../react-logic/hooks/useConvContext"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ChatsList = () => {
    const {conversations,isLoading} = useConvContext();
    return (
        <div className="access-chat-container">
            <div className="acess-chat-headers-container">
                <div className="access-chat-header access-chat-header-date">Zi</div>
                <div className="access-chat-header access-chat-header-hour">Ora</div>
                <div className="access-chat-header access-chat-header-message">Ultimul Mesaj</div>
            </div>
            {conversations.map((conversation,index) =>{
                const date = new Date(conversation.createdAt);
                return (
                <Link
                to={`/home/chat/${conversation._id}`}
                className="access-chat-button"
                key={index}>
                    <div className="access-chat-date access-chat-data">{date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()}.{date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}</div>
                    <div className="access-chat-hour access-chat-data">{date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}.{date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}</div>
                    <div className="access-chat-last-message">{conversation.last_message && conversation.last_message.text.slice(0,48)}...</div>
                    <div className="empty"></div>
                    <FontAwesomeIcon icon={faArrowRight} className="access-chat-go"/>
                </Link>
            )}
        )}
            <Link to="/home/chat/new" className="access-chat-add access-chat-data" >Incepe o noua conversatie<span className="add-plus">+</span></Link>
        </div>
    )
}

export default ChatsList;