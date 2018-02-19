import React from 'react';
import { PropTypes } from 'prop-types';

//({ handleChange, handleSubmit, roomList, joinRoom })
class RoomContainer extends React.Component {

    componentDidMount() {
        // Register emission handler

    }
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    };

    click() {
        // const { socket } = this.context;
        this.props.joinRoom();
    }

    render () {
        return (
            <div className="roomContainer">
                <ul>
                    {Object.keys(this.props.roomList).map((key) => {
                        return ( 
                            <li key={key}>
                                <input 
                                    type='button' 
                                    value={key} 
                                    onChange={(e) => { this.click; this.props.handleChange(e) }} 
                                    onClick={(e) => { this.click; this.props.handleChange(e) }} /> 
                            </li>
                        );
                    })}
                </ul>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="input-box">
                        <input type="text" placeholder="New room" onChange={this.props.handleChange} />
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
    
export default RoomContainer;

RoomContainer.contextTypes = {
    socket: PropTypes.object.isRequired
};