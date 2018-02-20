import React from 'react';

const UserContainer = ({ userListForRoom, opsListForRoom}) => {
    let opsRender = '';
    let userRender = '';
    if (opsListForRoom != undefined) {
        opsRender = (
            <ul>
                {Object.keys(opsListForRoom).map(function(key) {
                    return <li key={key}>@{opsListForRoom[key]}</li>;
                })}
            </ul>)
    }
    if (userListForRoom != undefined) {
        userRender = (
            <ul>
                {Object.keys(userListForRoom).map(function(key) {
                    return <li key={key}>{userListForRoom[key]}</li>;
                })}
            </ul>
        ) 
    }
    return (
        <div className="userContainer">
            {opsRender}
            {userRender}
        </div>
    )
}

export default UserContainer;