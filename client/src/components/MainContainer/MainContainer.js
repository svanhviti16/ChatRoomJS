import React from 'react';
import Nickname from '../Nickname/Nickname';
import ChatContainer from '../ChatContainer/ChatContainer';
import NavBar from '../NavBar/NavBar';

import socket from 'socket.io-client';

export default class MainContainer extends React.Component {
    render() {
        return(
            <div>
                <NavBar/>
                <ChatContainer />
                <Nickname iosocket={socket}>
                    <input type="text" onInput={(e) => onInput(e)} />
                </Nickname>
            </div>
        );
    };
};


