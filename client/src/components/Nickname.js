import React from 'react';

export default class Nickname extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.socket = props.iosocket;
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        var username = this.state.value;
        alert('A name was submitted: ' + username);
        iosocket.emit('adduser', username, () => {
            if (success) {
                console.log('yay');
            }
            
       
        });
        event.preventDefault();
    }

    
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label className="nick">
                Enter your nickname:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
};

