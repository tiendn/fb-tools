import React from 'react';
import './FBManager.css';
import FBApi from './FBApi';

class FBManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.accessToken = `EAACEdEose0cBAIRWHt4AaY4VbgieeZBZBAd2eZAktGrzeMJZAZCFBirff86JIMk5GytDhVGQErMXSWGHz0RfHoQghrdsoGJbiKAejtVhjNli8ZB46ogaTmuxLewuTL4fG2n7rVZAtFkaZBCRPGHBduvinB41vIdGxZBRIxCqwisvQfIufZCgcur0rdT14E473gIYZCPIOKDAN3lDAZDZD`;
    FBApi.setToken(this.accessToken);
    this.pageName = 'manchesterunited';
  }

    fetchData() {
        // const check = prompt("Plz enter input !");
        // if (check === '') {
            console.log(`/${this.pageName}?fields=posts{message}&access_token=${this.accessToken}`)
            if (window.FB)
                FBApi.getListPosts(this.pageName, response => {
                    if (response.error && response.error.message)
                        console.log('Successful err for: ', response);
                    else 
                        this.props.onLoadData(response);
                })
        // }
    }

    onTokenChange(event) {
        // console.log(event.target.value)
        this.accessToken = event.target.value;
        FBApi.setToken(this.accessToken);
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