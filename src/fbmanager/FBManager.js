import React from 'react';
import './FBManager.css';

class FBManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.accessToken = `EAAB38uuKAtMBAJ12q4Xi1KT26elLZAtcxZA7dg0gAOB4a8NcZA6je7agKcmzZCzCr8FNTo7ZCL1ZAh1BdIRlE5kyXPAqiyZBPOsjzh2owErbbM2WsUNVxZALnw5DWM04XyonZAn6A9HOUoHDI0VJ8HtmlDWgv7gUZAjNZB0LFL4hmq7ZBHE6oIjHbyiEFKCEEiDoeRUZD`;
    this.pageName = 'manchesterunited';
  }

    fetchData() {
        console.log(`/${this.pageName}?fields=feed{message}&access_token=${this.accessToken}`)
        if (window.FB)
            window.FB.api(`/${this.pageName}?fields=feed{message}&access_token=${this.accessToken}`, response => {
                if (response.error && response.error.message)
                    console.log('Successful err for: ', response);
                else 
                    this.props.onLoadData(response);
            })
        
    }

    onTokenChange(event) {
        // console.log(event.target.value)
        this.token = event.target.value;
    }

    onPageChange(event) {
        // console.log(event.target.value)
        this.pageName = event.target.value;
    }

    onKeyPress(event) {
        if (event.key === 'Enter')
            this.fetchData();
    }

    render() {
        return (
            <div className = "fb-tools-wrapper">
                <p> Place your token here. </p>
                <input 
                    type = "text" 
                    onChange = {(event) => this.onTokenChange(event)} 
                    placeholder = "Fill your token permission"
                    className = "input-form"
                />
                <p className="App-intro">
                    Place your page name  here.
                </p>
                <input 
                    type = "text" 
                    onChange = {(event) => this.onPageChange(event)} 
                    onKeyPress = {(key) => this.onKeyPress(key.nativeEvent)} 
                    placeholder = "Fill page name or page id"
                    className = "input-form"
                />
            </div>
        );
    }
}

export default FBManager;