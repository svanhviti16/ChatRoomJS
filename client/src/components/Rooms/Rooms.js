import React from 'react';
import { PropTypes } from 'prop-types';

export default class Rooms extends React.Component {

    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;
        console.log(this.state.roomList)
        socket.on('roomlist', (rooms) => {
            this.setState({roomList: rooms});
            console.log(this.state.roomList)
        })
        socket.emit('rooms');
    }

    constructor(props) {
        super(props);
        this.state = {
            room: '',
            pass: '',
            roomList: []
        };    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        return (
            <div className="room-window">
                <ul>
                    {Object.keys(this.state.roomList).map(function(key) {
                        return <li key={key}>{key}</li>;
                    })}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <div className="input-box">
                        <label className="room">
                        Enter a channel name:
                        </label>
                        <input type="text" value={this.state.room} onChange={this.handleChange} />
                        <input 
                            type="submit" 
                            value="Submit"
                            className="input input-big"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
    
Rooms.contextTypes = {
    socket: PropTypes.object.isRequired
};