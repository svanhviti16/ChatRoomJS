import React from 'react';

const UserContainer = ({ handleChange, handleSubmit, room, roomList}) => {
    return(
        <div className="userContainer">
            <ul>
                {Object.keys(roomList).map(function(key) {
                    return <li key={key}>{key}</li>;
                })}
            </ul>
            <form onSubmit={handleSubmit}>
                <div className="input-box">
                    <label className="room">
                        Users:
                    </label>
                    <input type="text" value={room.users} onChange={handleChange} />
                    <input 
                        type="submit" 
                        value="Submit"
                        className="input input-big"
                    />
                </div>
            </form>
        </div>
    )
}

export default UserContainer;