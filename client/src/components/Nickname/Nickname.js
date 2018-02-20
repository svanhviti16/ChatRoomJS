import React from 'react';
import { PropTypes } from 'prop-types';

export default class Nickname extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
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

        socket.emit('adduser', this.state.username, (available) => {
            if (this.state.username == '' || this.state.username.replace(/\s/g, '').length == 0) {
                alert('You have to input nickname!');
            }else if(!available) {
                alert('That nickname is taken!');
            } else {
                this.props.onInput(this.state.username);
            }
        });
    }

    render() {
        return (
            <div className="nick-window">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" className="inputs" placeholder="Enter your nickname" onChange={ (e) => { this.handleChange(e) }} />
                        <input type="submit" className="inputs" id="enterbutton" value="▶" className="input input-big" />
                    </div>
                </form>
            </div>
        );
    }
};
                    
Nickname.contextTypes = {
    socket: PropTypes.object.isRequired
};

