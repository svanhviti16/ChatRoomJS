import React from 'react';
import Nickname from '../Nickname/Nickname';
import ChatWindow from '../ChatWindow/ChatWindow';

import socket from 'socket.io-client';

export default class MainContainer extends React.Component {
    render() {
        return(
            <div>
                <Nickname iosocket={socket}>
                    <input type="text" onInput={(e) => onInput(e)} />
                </Nickname>
                <ChatWindow />
            </div>
        );
    };
};
