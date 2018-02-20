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



    render () {
        return (
            <div className="roomContainer">
                <form onSubmit={this.props.handleSubmit} >
                    <div>
                        <input className="textNewRoom" type="text" placeholder="New room" onChange={this.props.handleChange} />
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
                            <li key={key}>
                                <input className="button button4"
                                    type='button' 
                                    value={key} 
                                    onClick={(e) => { this.props.handleChange(e); this.props.handleSubmit(e); this.updateMessege(e) }} /> 
                            </li>
                        );
                    })}
                </ul>
                <form onSubmit={this.props.handleLeaveSubmit}>
                    <div>
                        <input 
                            type="submit" 
                            value="Leave room" 
                            className="button buttonLeaveRoom"
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