import React from 'react';
import { PropTypes } from 'prop-types';


class ChatWindow extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            messageHistory: []
        };    
    }
    
    componentDidMount() {
        const { socket } = this.context;
        socket.on('updatechat', (room, msgs) => {
            let messages = Object.assign([]);
            // Update the message state
            messages = msgs;
            this.setState({messageHistory: messages});
            console.log(msgs);
        });
    }
    sendMessage () {
        console.log(this.props);
        const { socket } = this.context;
        const data = {msg: this.state.msg, roomName: this.props.room};
        socket.emit('sendmsg', data);
        // this.setState({ msg: '' });
    }
    render() {
        return (
            <div className="chat-window">
                {this.state.messageHistory.map(m => ( <div key={m.timestamp}>{new Date(m.timestamp).toLocaleTimeString()} - {m.nick}: {m.message}</div> ))}
                <div className="input-box">
                    <input
                        type="text"
                        //value={msg}
                        className="input input-big"
                        onInput={(e) => this.setState({ msg: e.target.value })} 
                    />
                    <button type="button" className="btn pull-right" onClick={() => this.sendMessage()}>Send</button>
                </div>
            </div>
        );
    }
};

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatWindow;