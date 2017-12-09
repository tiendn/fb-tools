import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FBManager from './fbmanager/FBManager';
import FBResult from './fbresult/FBResult';

class App extends Component {
    state = {
        data: null,
        isLogin: true
    }

    componentWillMount() {
        this.checkHuman();
    }

    checkHuman() {
        const a = Math.round(Math.random() * 10);
        const b = Math.round(Math.random() * 10);
        
        const checkHuman = prompt(`${a} + ${b} = ??? `);
        if (checkHuman == (a+b))
            this.setState({ isLogin: true });
    }

    onLoadData(data) {
        this.setState({ data })
    }

    render() {
        const {data} = this.state;
        
        if (this.state.isLogin) 
            return (
                <div className="App">
                    <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                        To get started, place your  <code>USER_TOKEN</code> here.
                    </p>
                    <FBManager onLoadData = {(data) => this.onLoadData(data)} />
                    <FBResult data = {data} />
                </div>
            );
        return <p>Hello</p>;
  }
}

export default App;
