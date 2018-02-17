import React from 'react';
//import { PropTypes } from 'prop-types';


const RoomContainer = ({ handleChange, handleSubmit, room, roomList}) => {


    return (
        <div className="roomContainer">
            <ul>
                {Object.keys(roomList).map(function(key) {
                    return <li key={key}>{key}</li>;
                })}
            </ul>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <label className="room">
                        Enter a channel name:
                    </label>
                    <input type="text" value={room} onChange={handleChange} />
                    <input 
                        type="submit" 
                        value="Submit"
                        className="input input-big"
                    />
                </div>
            </form>
        </div>
    );
};
    
export default RoomContainer;