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
        socket.on('updatechat', (room, messages) => {
            this.setState({messageHistory: messages});
        });
    }
    sendMessage (event) {
        event.preventDefault();
        const { socket } = this.context;
        const data = {msg: this.state.msg, roomName: this.props.room};
        socket.emit('sendmsg', data);
        this.setState({msg: '' }); 
    }

    render() {
        return (
            <div className="chat-window">
                <h2 className="roomname">#{this.props.room}</h2>
                <div className="scroll">
                    {this.state.messageHistory.map(m => ( <div className="textLook" key={m.timestamp}>{new Date(m.timestamp).toLocaleTimeString()} - {m.nick}: {m.message}</div> ))}
                </div>
                <form onSubmit={(e) => { this.sendMessage(e) }}>
                    <div className="input-box">
                        <input
                            type="text"
                            value={this.state.msg}
                            className="input input-big"
                            onInput={(e) => this.setState({ msg: e.target.value })} 
                        />
                        <input type="submit" value="Send" className="btn pull-right"/>
                    </div>
                </form>
            </div>
        );
    }
};

ChatWindow.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default ChatWindow;