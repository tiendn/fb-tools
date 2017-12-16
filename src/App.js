import React, { Component } from 'react';
// import logo from './logo.svg';
// import logo from './avatar.png';
import logo from './avatar.png';
import './App.css';
import FBManager from './fbmanager/FBManager';
import FBPost from './fbpost/FBPost';

class App extends Component {
    state = {
        data: null,
        // isLogin: false,
        // isHuman: false
        isLogin: true,
        isHuman: true
    }

    componentWillMount() {
        // this.checkHuman();
        // this.checkPermission();
    }

    checkHuman() {
        const a = Math.round(Math.random() * 10);
        const b = Math.round(Math.random() * 10);
        
        const checkHuman = prompt(`${a} + ${b} = ??? `);
        if (checkHuman == (a+b))
            this.setState({ isHuman: true });
    }

    checkPermission() {
        const checkPermission = prompt(`Where are you from ?`);
        if (checkPermission === 'Internet')
            this.setState({ isLogin: true }); 
    }

    onLoadData(data) {
        this.setState({ data })
    }

    render() {
        const {data} = this.state;
        
        if (this.state.isLogin && this.state.isHuman) 
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to DaoNamTien's fb tools</h1>
                    </header>
                    <p className="App-intro">
                        To get started, place your  <code>USER_TOKEN</code> here.
                    </p>
                    <FBManager onLoadData = {(data) => this.onLoadData(data)} />
                    <h2 className = "App-body-title"> The post results </h2>
                    <FBPost data = {data} />
                </div>
            );
        return <p>Hello</p>;
  }
}

export default App;
