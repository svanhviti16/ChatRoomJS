import React from 'react';

const UserContainer = ({ userListForRoom, userListForOps}) => {
    let opsRender = '';
    let userRender = '';
    if (userListForOps != undefined) {
        opsRender = (
            <ul>
                {Object.keys(userListForOps).map(function(key) {
                    return <li key={key}>@{userListForOps[key]}</li>;
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