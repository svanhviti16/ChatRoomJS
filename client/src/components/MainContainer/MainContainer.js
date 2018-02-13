import React from 'react';

export default class Container extends React.Component {
    render() {
        return(
            <div className="chatContainer">{this.props.children}</div>
        );
    };
};
