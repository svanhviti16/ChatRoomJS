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
            //let messages = Object.assign([]);
            // Update the message state
            //messages = msgs;
            this.setState({messageHistory: messages});
            //console.log(msgs);
        });
    }
    sendMessage (event) {
        event.preventDefault();
        const { socket } = this.context;
        const data = {msg: this.state.msg, roomName: this.props.room};
        socket.emit('sendmsg', data);
        this.setState({msg: '' }); 
        console.log(this.state.msg);
        // this.state.setNativeProps({msg:''})
    }

    render() {
        return (
            <div className="chat-window">
                {this.state.messageHistory.map(m => ( <div key={m.timestamp}>{new Date(m.timestamp).toLocaleTimeString()} - {m.nick}: {m.message}</div> ))}
                <form onSubmit={(e) => this.sendMessage(e)}>
                    <div className="input-box">
                        <input
                            type="text"
                            value={this.state.msg}
                            className="input input-big"
                            onInput={(e) => this.setState({ msg: e.target.value })} 
                        />
                        <input type="submit" value="Submit" className="btn pull-right"/>
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