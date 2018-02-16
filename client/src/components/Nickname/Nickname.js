import React from 'react';
import { PropTypes } from 'prop-types';

export default class Nickname extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            room: 'lobby'
            //users: []
        };    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({username: event.target.value});
    }
    
    handleSubmit(event) {
        const { socket } = this.context;
        event.preventDefault();
        //this.setState({username: event.target.value});
        console.log(event);
        socket.emit('adduser', this.state.username, (available) => {
            if (!available) {
                this.state.username = '';
            } else {
                alert(this.state.username);

            }
        });
        socket.emit('joinroom', this.state, (success) => {
            if (!success) {
                console.log('Banned');
            } else {
                socket.emit('rooms');
            }
        });
        
    }

    render() {
        console.log(this.state);
        return (
            <div className="nick-window">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-box">
                        <label className="nick">
                        Enter your nickname:
                        </label>
                        <input type="text" onChange={this.handleChange} />
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
};
//<button type="button" className="btn pull-right" onClick={() => this.handleSubmit()}>Submit</button>
                    
Nickname.contextTypes = {
    socket: PropTypes.object.isRequired
};

