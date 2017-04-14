import React, { Component } from 'react';
import MenuContainer from '../containers/MenuContainer'
import { FacebookLogin } from 'react-facebook-login-component'

class App extends Component {
    render() {
        const responseFacebook = (response)=>{
            this.props.change_pseudo(response.name)()
        }
        const clickFacebookLogin = ()=>{
            document.querySelector(".facebook-login").click()
        }
        return (
            <div className="App">
                <a className="btn btn-block btn-social btn-facebook" onClick={ clickFacebookLogin }>
                    <span className="fa fa-facebook" /> Sign in with Facebook
                </a>
                <FacebookLogin socialId="260413951079480"
                               language="en_US"
                               scope="public_profile,email"
                               responseHandler={ responseFacebook }
                               xfbml={true}
                               fields="id,email,name"
                               version="v2.5"
                               class="facebook-login"
                               className="btn btn-block btn-social btn-facebook"
                               buttonText="Login With Facebook" />
                <MenuContainer />
            </div>
        );
    }
}

export default App;
