import React from 'react';
import UserContainer from '../UserContainer/UserContainer';
import RoomContainer from '../RoomContainer/RoomContainer';
import ChatWindow from '../ChatWindow/ChatWindow';
import { PropTypes } from 'prop-types';


class ChatContainer extends React.Component {

    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;

        socket.on('updateusers', (room, users, ops) => {
            // to avoid ops in userlist 
            if (this.state.username in ops && this.state.username in users) {             
                delete users[this.state.username];
            }
            this.setState({opsListForRoom: ops});
            this.setState({userListForRoom: users});
        })
        socket.on('roomlist', (rooms) => {
            this.setState({roomList: rooms});
        })

        this.joinRoom('lobby');
    }

    constructor(props) {
        super(props);
        this.state = {
            room: 'lobby',
            pass: '',
            roomList: [],
            userListForRoom: [],
            opsListForRoom: [],
            childWasClicked: false,
            username: props.username
        };  
        
    }

    joinRoom(room) {
        const { socket } = this.context;
        socket.emit('joinroom', { 'room': room }, (success) => {
            if (!success) {
                socket.emit('rooms');
            } else {
                socket.emit('rooms');
            }
        });
    }

    partRoom() {
        event.preventDefault();
        const { socket } = this.context;
        socket.emit('partroom', this.state.room);
        this.setState({room: 'lobby'});
    }

    //for leaving room
    handleLeaveChange() {
        this.setState({room: 'lobby'});
    }
    handleLeaveSubmit(event) {
        event.preventDefault();
        this.partRoom();
    }

    // for joining room
    handleChange(event) {
        this.setState({room: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.joinRoom(this.state.room); 
    }
    // for switching rooms
    handleClick(event) {
        this.setState({room: event.target.value});
        this.joinRoom(event.target.value); 
    }

    render() {
        const {roomList, room, userListForRoom, opsListForRoom } = this.state;
        return(
            <div className="chatContainer">
                <RoomContainer 
                    handleClick={this.handleClick.bind(this)} 
                    handleChange={this.handleChange.bind(this)} 
                    handleSubmit={this.handleSubmit.bind(this)} 
                    handleLeaveSubmit={this.handleLeaveSubmit.bind(this)} 
                    joinRoom={this.joinRoom} 
                    partRoom={this.partRoom}  
                    roomList={roomList} 
                    room={room} />
                <ChatWindow  room={room} />
                <UserContainer 
                    userListForRoom={userListForRoom} opsListForRoom={opsListForRoom}/>
            </div>
        )
    }
}

export default ChatContainer;

ChatContainer.contextTypes = {
    socket: PropTypes.object.isRequired
};