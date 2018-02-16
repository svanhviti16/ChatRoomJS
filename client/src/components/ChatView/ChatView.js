import React from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';

const ChatView = (room) => {
    return(
        <div className="chatView">
            <ChatWindow room={room}/>
        </div>
    )
}

export default ChatView;