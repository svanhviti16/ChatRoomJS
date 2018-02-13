import React from 'react';
import UserContainer from '../UserContainer/UserContainer';
import RoomContainer from '../RoomContainer/RoomContainer';
import ChatView from '../ChatView/ChatView';


const ChatContainer = () => {
    return(
        <div className="chatContainer">
            <UserContainer />
            <ChatView/>
            <RoomContainer/>
        </div>
    )
}

export default ChatContainer;