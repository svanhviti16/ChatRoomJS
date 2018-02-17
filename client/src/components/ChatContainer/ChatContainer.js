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

        socket.on('updateusers', (room, users, ops) => {
            this.setState({userListForOps: ops});
            this.setState({userListForRoom: users});
            console.log('ops' + ops);
            console.log('users' + users);
        })
        this.joinRoom();
    }

    constructor(props) {
        super(props);
        this.state = {
            room: 'lobby',
            pass: '',
            roomList: [],
            userListForRoom: [],
            userListForOps: []
        };    
    }



    joinRoom() {
        const { socket } = this.context;
        socket.emit('joinroom', this.state, (success) => {
            if (!success) {
                console.log('Banned');
            } else {
                socket.emit('rooms');
            }
        });
    }
    handleChange(event) {
        console.log(event.target.value)
        this.setState({room: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        //this.setState({username: event.target.value});
        this.joinRoom();
        console.log(event);
        

    }
    
    render() {
        const {room, roomList, userListForRoom, userListForOps} = this.state;
        return(
            <div className="chatContainer">
                <RoomContainer handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} room={room}  roomList={roomList} />
                <ChatWindow room={room} />
                <UserContainer  userListForRoom={userListForRoom} userListForOps={userListForOps}/>
            </div>
        )
    }
}

export default ChatContainer;

ChatContainer.contextTypes = {
    socket: PropTypes.object.isRequired
};