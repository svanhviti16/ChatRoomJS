import React from 'react';
import Nickname from '../Nickname/Nickname';
import ChatContainer from '../ChatContainer/ChatContainer';
import NavBar from '../NavBar/NavBar';

import socket from 'socket.io-client';

export default class MainContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameEntered: false
        };    
    }

    onInput() {
        this.setState({usernameEntered: true});
    }
    render() {
        let toRender = <ChatContainer />;
        if (!this.state.usernameEntered) {
            toRender = (
                <Nickname className="nick" iosocket={socket} onInput={this.onInput.bind(this)}>
                    <input type="text" />
                </Nickname>
            )
        }
        return(
            <div>
                <NavBar/>
                {toRender}
            </div>
        );
    };
};


