import React from 'react';
import UserContainer from '../UserContainer/UserContainer';
import RoomContainer from '../RoomContainer/RoomContainer';
import ChatWindow from '../ChatWindow/ChatWindow';
import { PropTypes } from 'prop-types';


class ChatContainer extends React.Component {

    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;

        this.joinRoom();

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

        socket.on('updatechat', (room, messages) => {
            this.setState({messageHistory: messages});
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            room: 'lobby',
            pass: '',
            roomList: [],
            userListForRoom: [],
            userListForOps: [],
            childWasClicked: false,
            messageHistory: []
        };  
        
    }

    joinRoom() {
        const { socket } = this.context;
        socket.on('updateusers', (room, users, ops) => {
            this.setState({userListForOps: ops});
            this.setState({userListForRoom: users});
            console.log('ops' + ops);
            console.log('users' + users);
        })
        socket.emit('joinroom', this.state, (success) => {
            if (!success) {
                console.log('Banned');
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

        socket.on('updateusers', (room, users, ops) => {

            this.setState({userListForOps: ops});
            this.setState({userListForRoom: users});
            console.log('ops' + ops);
            console.log('users' + users);
        })

    }
    handleLeaveChange(event) {
        console.log(event.target.value)
        this.setState({room: 'lobby'});
    }
    handleLeaveSubmit(event) {
        event.preventDefault();
        //this.setState({username: event.target.value});
        this.partRoom();
        console.log(event);
    }
    onChildClicked() {
        this.setState({childWasClicked : !this.state.childWasClicked });
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
        const {roomList, room, userListForRoom, userListForOps, messageHistory } = this.state;
        return(
            <div className="chatContainer">
                <RoomContainer handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} handleLeaveSubmit={this.handleLeaveSubmit.bind(this)} joinRoom={this.joinRoom} partRoom={this.partRoom} room={room}  roomList={roomList} />
                <ChatWindow room={room} />
                <UserContainer  messageHistory={messageHistory} userListForRoom={userListForRoom} userListForOps={userListForOps}/>
            </div>
        )
    }
}
//<RoomContainer handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} room={room}  roomList={roomList} joinRoom={this.joinRoom} />

export default ChatContainer;

ChatContainer.contextTypes = {
    socket: PropTypes.object.isRequired
};