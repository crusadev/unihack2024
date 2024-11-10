import { useEffect, useRef } from "react";
import "./index.css"

const ChatConversation = ({messages}) => {  
    const messages_ref = useRef(null);
    useEffect(() => {
        messages_ref.current?.lastElementChild?.scrollIntoView({behavior:"smooth"})
    },[messages]) 
    return (
        <div className="chat-conversation-container">
            {!messages ?
            <div className="chat-conversation-welcome">Welcome</div>
            :
            <>
                <div className="degrading-text"></div>
                <div ref={messages_ref}>
                {messages.map((message,index) => (
                    <div className="message-couple" key={index}>
                        <div className="message-sent-container">
                            <div className="message-sent">
                                {message.prompt}
                            </div>
                        </div>
                        <div className="message-received-container">
                            <div className="message-received">
                                {message.response}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </>
            }
        </div>
    )
}

export default ChatConversation;