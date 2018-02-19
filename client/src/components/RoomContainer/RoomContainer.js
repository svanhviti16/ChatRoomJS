import React from 'react';
import { PropTypes } from 'prop-types';

//({ handleChange, handleSubmit, roomList, joinRoom })
class RoomContainer extends React.Component {

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
                <ul className="input-box">
                    {Object.keys(this.props.roomList).map((key) => {
                        return ( 
                            <li key={key}>
                                <input type='button' className="inputs" value={key} onChange={this.props.handleChange} onClick={() => { this.click ; this.props.handleChange ; }} /> 
                            </li>
                        );
                    })}
                </ul>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        <input type="text" placeholder="New room" onChange={this.props.handleChange} />
                        <input 
                            type="submit" 
                            value="▶"
                            className="inputs"
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