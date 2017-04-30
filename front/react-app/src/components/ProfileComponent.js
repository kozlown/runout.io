import React, { Component } from 'react'
import { FacebookLogin } from 'react-facebook-login-component'
import Input from './tools/Input'

class ProfileComponent extends Component {
    render() {
        const display = this.props.state.Menu.panel === 'Profile' ? 'visible' : 'hidden'

        const handleFacebookResponse = (response) => {
            const req = new XMLHttpRequest()
            req.open('GET', `https://graph.facebook.com/me?access_token=${response.accessToken}`, false)
            req.send(null)

            if (req.status === 200) {
                console.info(req.responseText)
            } else {
                console.info('Status de la réponse: %d (%s)', req.status, req.statusText)
            }
            if (this.props.state.Profile.pseudo === 'Guest') {
                this.props.change_pseudo(response.name)()
            }
            this.props.change_real_name(response.name)()
        }

        const clickFacebookLogin = () => {
            document.querySelector('.facebook-login').click()
        }

        const handleChangePseudo = (e) => {
            this.props.change_pseudo(e.target.value)()
        }

        const handleChangeFullName = (e) => {
            e.preventDefault()
        }

        return (
            <div className={ `Profile ${display}` }>
                <Input id="fullName"
                       className="input_container"
                       label="Full name"
                       name="fullName"
                       onChange={ handleChangeFullName }
                       type="text"
                       value={ this.props.state.Profile.realName }
                       disabled />
                <Input id="pseudo"
                       className="input_container"
                       label="Pseudo"
                       name="pseudo"
                       onChange={ handleChangePseudo }
                       type="text"
                       value={ this.props.state.Profile.pseudo } />
                <div className="facebook-login-container">
                    <a className="btn btn-block btn-social btn-facebook" onClick={ clickFacebookLogin }>
                        <span className="fa fa-facebook" /> Sign in with Facebook
                    </a>
                    <FacebookLogin socialId="260413951079480"
                                   language="en_US"
                                   scope="public_profile,email"
                                   responseHandler={ handleFacebookResponse }
                                   xfbml={true}
                                   fields="id,email,name"
                                   version="v2.5"
                                   class="facebook-login"
                                   className="btn btn-block btn-social btn-facebook"
                                   buttonText="Login With Facebook" />
                </div>
            </div>
        )
    }
}

export default ProfileComponent
