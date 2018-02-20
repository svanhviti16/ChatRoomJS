import React from 'react';
import { PropTypes } from 'prop-types';

//({ handleChange, handleSubmit, roomList, joinRoom })
class RoomContainer extends React.Component {

    componentDidMount() {
        // Register emission handler

    }
    constructor(props) {
        super(props);
        // this.click = this.click.bind(this);
    };

    handleRoomChange(e) {
        this.props.handleChange(e);
        this.props.handleSubmit(e);
    } 

    render () {
        return (
            <div className="roomContainer">
                <ul className="input-box">
                    {Object.keys(this.props.roomList).map((key) => {
                        return ( 
                            <li key={key} onClick={(e) => { this.props.handleSubmit(e) }}>
                                <input 
                                    type='button' 
                                    value={key} 
                                /> 
                            </li>
                        );
                    })}
                </ul>
                <form onSubmit={(e) => { this.props.handleSubmit(e) }}>
                    <div>
                        <input id="newRoomID" type="text" placeholder="New room" />
                        <input 
                            type="submit" 
                            value="▶"
                            className="inputs"
                        />
                    </div>
                </form>
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