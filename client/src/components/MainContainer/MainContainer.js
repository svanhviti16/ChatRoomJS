import React from 'react';
import Nickname from '../Nickname/Nickname';
import ChatContainer from '../ChatContainer/ChatContainer';
import NavBar from '../NavBar/NavBar';

export default class MainContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameEntered: false,
            username: ''
        };    
    }
    
    onInput(username) {
        this.setState({username: username});
        this.setState({usernameEntered: true});
    }
    render() {
        let toRender = <ChatContainer  username={this.state.username}/>;
        if (!this.state.usernameEntered) {
            toRender = (
                <Nickname className="nick" onInput={this.onInput.bind(this)} username={this.state.username} >
                    <input type="text" />
                </Nickname>
            )
        }
        return(
            <div>
                {this.state.username}
                <NavBar/>
                {toRender}
            </div>
        );
    };
};


