import React from 'react';
import UserContainer from '../UserContainer/UserContainer';
import RoomContainer from '../RoomContainer/RoomContainer';
import ChatWindow from '../ChatWindow/ChatWindow';
import { PropTypes } from 'prop-types';


class ChatContainer extends React.Component {

    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;
        console.log(this.state.roomList)
        socket.on('roomlist', (rooms) => {
            this.setState({roomList: rooms});
            console.log(this.state.roomList)
        })
        socket.emit('rooms');

        socket.on('userlist', (users) => {
            this.setState({userList: users});
            console.log(this.state.userList)
        })
        socket.emit('users');
    }

    constructor(props) {
        super(props);
        this.state = {
            room: '',
            pass: '',
            roomList: [],
            userList: []
            
        };    
        //        this.handleChange = this.handleChange.bind(this);
        //        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleChange(event) {
        console.log(event.target.value)
        this.setState({room: event.target.value});
    }
    
    handleSubmit(event) {
        const { socket } = this.context;
        event.preventDefault();
        //this.setState({username: event.target.value});
        console.log(event);
        socket.emit('joinroom', this.state, (success) => {
            if (!success) {
                console.log('Banned');
            } else {
                socket.emit('rooms');
            }
        });
    }
    
    render() {
        const {room, roomList} = this.state;
        return(
            <div className="chatContainer">
                <RoomContainer handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} room={room}  roomList={roomList} />
                <ChatWindow />
                <UserContainer />
            </div>
        )
    }
}

export default ChatContainer;

ChatContainer.contextTypes = {
    socket: PropTypes.object.isRequired
};