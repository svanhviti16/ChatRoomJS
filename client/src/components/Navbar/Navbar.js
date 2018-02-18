import React from 'react';

const Navbar = () => {

    const logo = require('./images/ask.png');

    return(
        <div className="navBar"> 
            <img src={logo}/>
        </div>
    )
}

export default Navbar;