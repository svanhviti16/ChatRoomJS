import React from 'react';
import { PropTypes } from 'prop-types';

class RoomContainer extends React.Component {

    componentDidMount() {
        // Register emission handler
    }
    constructor(props) {
        super(props);
    };

    handleRoomChange(e) {
        this.props.handleChange(e);
        this.props.handleSubmit(e);
    } 

    render () {
        return (
            <div className="roomContainer">
                <form onSubmit={this.props.handleSubmit } >
                    <div>
                        <input className="textNewRoom" type="text" placeholder="New room" onChange={this.props.handleChange } />
                        <input 
                            type="submit" 
                            value="▶"
                            className="button buttonNewRoom"
                        />
                    </div>
                </form>
                <ul>
                    {Object.keys(this.props.roomList).map((key) => {
                        return ( 
                            <li key={key} onClick={(e) => { this.props.handleClick(e) }}>
                                <input 
                                    type='button' 
                                    value={key} 
                                /> 
                            </li>
                        );
                    })}
                </ul>
                <form onSubmit={this.props.handleLeaveSubmit}>
                    <div className="leave-room">
                        <input 
                            type="submit" 
                            value="Leave room" 
                            className="input input-big"
                            onChange={this.props.handleLeaveChange} />                       
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