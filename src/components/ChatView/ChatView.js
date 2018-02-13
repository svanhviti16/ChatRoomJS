import React from 'react';
import { PropTypes } from 'prop-types';

export default class ChatView extends React.Component {
    render () {
        return (
            <div className="chat-window">
                <div className="input-box">
                    <input type="text" className="input input-big" />
                    <button type="button" className="btn pull-right">Send</button>
                </div>
            </div>
        )
    }
}

ChatView.contextTypes = {
    socket: PropTypes.object.isRequired
};