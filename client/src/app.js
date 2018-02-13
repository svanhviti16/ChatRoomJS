import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import MainContainer from './components/MainContainer/MainContainer';
import socketClient from 'socket.io-client';
import { PropTypes } from 'prop-types';


class App extends React.Component {
    componentDidCatch(error, info) {
        console.log(error, info);
    }
    getChildContext() {
        return {
            socket: socketClient('http://localhost:8080')
        };
    }
    render() {
        return (
            <div className="container">
                <ChatWindow />
            </div>
        );
    }

    
    
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                
                <MainContainer>
                    <div className="mainContainer">{this.props.children}</div>
                </MainContainer>
            </div>
        );
    }
}

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};

ReactDOM.render(<App />, document.getElementById('app'));
