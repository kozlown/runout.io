import React, { Component } from 'react'
import urlencode from 'urlencode'
import { FacebookLogin } from 'react-facebook-login-component'
import config from '../config'
import Input from './tools/Input'

class ProfileComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo: 'Guest',
            pseudoWarning: '',
            pseudoError: ''
        }
    }
    componentDidMount() {
        const readCookie = (name) => {
            const nameEQ = `${name}=`
            const ca = document.cookie.split(';')
            for (let i = 0; i < ca.length; i += 1) {
                let c = ca[i]
                while (c.charAt(0) === ' ') c = c.substring(1, c.length)
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
            }
            return null
        }
        const token = readCookie('token')
        if (token !== null) {
            try {
                const tokenObject = JSON.parse(token)
                const renewAfter = tokenObject.renewAfter
                const now = Date.now()
                // if the token has not lived the first time step
                if (now < renewAfter) {
                    this.updateProfile()
                } else {
                    // else if the token has lived the first time step,
                    // renew token
                    ProfileComponent.renewToken((succeed, response) => {
                        if (succeed) {
                            this.updateProfile()
                        } else {
                            console.error(response)
                        }
                    })
                }
            } catch (e) {
                console.info(e)
            }
        }
    }
    render() {
        const display = this.props.state.Menu.panel === 'Profile' ? 'visible' : 'hidden'

        const handleFacebookResponse = (response) => {
            const reqLogin = new XMLHttpRequest()
            const reqParams = `loginType=facebook&facebookToken=${response.accessToken}`
            reqLogin.open('POST', `${config.api.host}/api/user/login`)
            reqLogin.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            reqLogin.send(reqParams)

            reqLogin.onreadystatechange = () => {
                if (reqLogin.readyState === 4 && reqLogin.status === 200) {
                    try {
                        const profileResponse = JSON.parse(reqLogin.responseText)
                        const token = profileResponse.token
                        const expiresOn = new Date(JSON.parse(token).expiresOn).toUTCString()
                        document.cookie = `token=${token};expires=${expiresOn}; path=/`
                        this.updateProfile()
                    } catch (e) {
                        console.info(e)
                    }
                }
            }
        }
        const clickFacebookLogin = () => {
            document.querySelector('.facebook-login').click()
        }
        const handleChangePseudo = (e) => {
            // if he's not logged in he can't change pseudo
            const getCookie = (cname) => {
                const name = `${cname}=`
                const decodedCookie = decodeURIComponent(document.cookie)
                const ca = decodedCookie.split(';')
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i]
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1)
                    }
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length)
                    }
                }
                return ''
            }
            if (!getCookie('token')) {
                this.setState({
                    pseudoWarning: 'You must login to change your pseudo.'
                })
                return
            }
            const pseudo = e.target.value
            this.setState({
                pseudo
            })
            ProfileComponent.changePseudo(pseudo, (succeed, response) => {
                if (succeed) {
                    this.props.change_pseudo(pseudo)()
                    this.setState({
                        pseudoWarning: ''
                    })
                } else {
                    try {
                        const responseObject = JSON.parse(response)
                        this.setState({
                            pseudoWarning: responseObject.message
                        })
                    } catch (err) {
                        console.error(err)
                    }
                }
            })
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
                       warningMessage={ this.state.pseudoWarning }
                       errorMessage={ this.state.pseudoError }
                       value={ this.state.pseudo } />
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
    updateProfile() {
        const reqGetProfile = new XMLHttpRequest()
        reqGetProfile.open('GET', `${config.api.host}/api/user/profile`)
        reqGetProfile.withCredentials = true
        reqGetProfile.send(null)

        reqGetProfile.onreadystatechange = () => {
            if (reqGetProfile.readyState === 4 && reqGetProfile.status === 200) {
                try {
                    const getProfileResponse = JSON.parse(reqGetProfile.responseText)
                    const facebookName = getProfileResponse.data.facebook_name
                    const pseudo = getProfileResponse.data.pseudo
                    this.props.change_real_name(facebookName)()
                    this.props.change_pseudo(pseudo)()
                    this.setState({
                        pseudo,
                        pseudoWarning: ''
                    })
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }
    static renewToken(callback) {
        const reqGetToken = new XMLHttpRequest()
        reqGetToken.open('GET', `${config.api.host}/api/user/token`)
        reqGetToken.withCredentials = true
        reqGetToken.send(null)

        reqGetToken.onreadystatechange = () => {
            if (reqGetToken.readyState === 4) {
                if (reqGetToken.status === 200) {
                    try {
                        const tokenResponse = JSON.parse(reqGetToken.responseText)
                        const token = tokenResponse.token
                        const expiresOn = new Date(JSON.parse(token).expiresOn).toUTCString()
                        document.cookie = `token=${token};expires=${expiresOn}; path=/`
                        callback(true)
                    } catch (e) {
                        console.error(e)
                        callback(false, e)
                    }
                } else {
                    callback(false, reqGetToken.responseText)
                }
            }
        }
    }
    static changePseudo(pseudo, callback) {
        const reqChangePseudo = new XMLHttpRequest()
        const params = `pseudo=${urlencode(pseudo)}`
        reqChangePseudo.open('PUT', `${config.api.host}/api/user/pseudo`)
        reqChangePseudo.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        reqChangePseudo.withCredentials = true
        reqChangePseudo.send(params)

        reqChangePseudo.onreadystatechange = () => {
            if (reqChangePseudo.readyState === 4) {
                if (reqChangePseudo.status === 200) {
                    callback(true)
                } else {
                    callback(false, reqChangePseudo.responseText)
                }
            }
        }
    }
}

export default ProfileComponent
