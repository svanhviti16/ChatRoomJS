import React from 'react';

const Navbar = ({username}) => {

    const logo = require('./images/ask.png');
    console.log('username' + username);
    return(
        <div className="navBar">
            <div className="imgs">
                <img src={logo}/>
            </div>
            <div className="user">
                <h2>{username}</h2>
            </div>
        </div>
    )
}

export default Navbar;