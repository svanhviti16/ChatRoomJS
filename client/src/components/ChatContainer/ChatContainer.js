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
            this.setState({userListForOps: ops});
            this.setState({userListForRoom: users});
            
            console.log('ops' + ops);
            console.log('users' + users);
        })

        /*socket.on('updatechat', (room, messages) => {
            this.setState({messageHistory: messages});
        });*/


        console.log(this.state.roomList)
        socket.on('roomlist', (rooms) => {
            this.setState({roomList: rooms});
            console.log(this.state.roomList)
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
            userListForOps: [],
            childWasClicked: false,
            username: props.username
        };  
        
    }

    joinRoom() {
        /* console.log('í joinroom, newroom:');
        console.log(newRoom);
        console.log('týpan á newroom:');
        console.log(typeof(newRoom));
        //this.setState({room: newRoom});
        console.log('í joinroom, this.state.room:');
        console.log(this.state.room);
        
        */
        //console.log('this.state.room í joinRoom');
        //console.log(this.state.room);

        const { socket } = this.context;
        console.log('fyrir emit');

        socket.emit('joinroom', { 'room': this.state.room }, (success) => {
            if (!success) {
                console.log(this.state.room);
                console.log('Banned');
                socket.emit('rooms');
            } else {
                console.log('success');
                console.log(this.state.room);
                //this.setState({room: newRoom});
                socket.emit('rooms');
            }

        });

        console.log('komin út úr, hér er this.state.room:');

        console.log(this.state.room);

        //socket.emit('rooms');

    }

    partRoom() {
        event.preventDefault();
        const { socket } = this.context;
        socket.emit('partroom', this.state.room);
        this.setState({room: 'lobby'});

        /* socket.on('updateusers', (room, users, ops) => {

            this.setState({userListForOps: ops});
            this.setState({userListForRoom: users});
            console.log('ops' + ops);
            console.log('users' + users);
        })*/

    }
    handleLeaveChange(event) {
        console.log(event.props.value)
        this.setState({room: 'lobby'});
    }
    handleLeaveSubmit(event) {
        event.preventDefault();
        //this.setState({username: event.target.value});
        this.partRoom();
        console.log('leave room');
        console.log(event);
    }

    handleChange(event) {
        console.log('event.target.value í handlechange')

        console.log(event.target.value)
        this.setState({room: event.target.value});

    }
    
    handleSubmit(event) {
        event.preventDefault();
        //this.setState({room: event.target.value});

        console.log('í handlesubmit, event.target.value');
        // const newRoom = event.target.value;
        console.log(event.target.value);

        this.joinRoom(); 
    }
    // fyrir inputtið
    handleClick(event) {
        console.log('event.target.value í handleClick')

        console.log(event.target.value);
        this.setState({room: event.target.value});
        this.joinRoom(); 

    }
    
    /* kickUser(event) {
        if (this.state.username in this.state.userListForOps) {             
            socket.emit('kick', function (event) {

            }
        }
    }*/
    render() {
        const {roomList, room, userListForRoom, userListForOps } = this.state;
        return(
            <div className="chatContainer">
                <RoomContainer handleClick={this.handleClick.bind(this)} room={room} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} handleLeaveSubmit={this.handleLeaveSubmit.bind(this)} joinRoom={this.joinRoom} partRoom={this.partRoom}  roomList={roomList} />
                <ChatWindow  room={room} />
                <UserContainer userListForRoom={userListForRoom} userListForOps={userListForOps}/>
            </div>
        )
    }
}

export default ChatContainer;

ChatContainer.contextTypes = {
    socket: PropTypes.object.isRequired
};