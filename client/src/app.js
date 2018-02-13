import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import Container from './components/Container';
import Nickname from './components/Nickname';
//import { BrowserRouter, Route, Link } from 'react-router-dom'
import socketClient from 'socket.io-client';
//import Popup from 'react-popup';
//import Prompt from './components/Prompt';

//var BrowserRouter = require('react-router-dom').BrowserRouter
//var Route = require('react-router-dom').Route
//var Link = require('react-router-dom').Link
const socket = socketClient('http://localhost:8080');


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log(socket);

    }
    render() {
        return (
            <div>
                
                <Container>
                    <h2>ChatRoom</h2>
                </Container>
                <Nickname iosocket={socket}>
                    
                    <input type="text" onInput={(e) => onInput(e)} /></Nickname>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
