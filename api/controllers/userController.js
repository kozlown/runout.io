import _ from 'lodash'
import request from 'request'
import userModel from '../models/userModel'

const userController = {
    register({ registrationType, facebook }, callback) {
        switch (registrationType) {
            case 'facebook':
                if (_.isUndefined(facebook)) {
                    throw new Error('No data found for Facebook registration.')
                }
                // ask facebook about the user
                new Promise((resolve, reject) => {
                    request.get('https://graph.facebook.com/me', {
                        access_token: facebook.accessToken
                    }).on('response', (facebookResponse) => {
                        // if successful
                        if (facebookResponse.status_code === 200) {
                            resolve(facebookResponse)
                        }
                        // if fail
                        reject({
                            facebookResponse
                        })
                    })
                })
                // if facebook recovery succeed
                .then(facebookResponse => userModel.register({
                    type: facebook,
                    name: facebookResponse.name,
                    facebook_token: facebookResponse.access_token
                }))
                // if something failed
                .then(undefined, ({ facebookResponse, registrationResponse }) => {
                    // if facebook recovery failed
                    if (!_.isUndefined(facebookResponse)) {
                        callback({
                            statusCode: 401,
                            message: 'Data recovery from Facebook failed, see the facebook\'s response below.',
                            facebookResponse
                        })
                    }
                    // if registration failed
                    else if (!_.isUndefined(registrationResponse)) {
                        callback(registrationResponse)
                    } else throw new Error('Should never arrive here.')
                })
                break
            case 'google':
                callback({
                    statusCode: 404,
                    message: 'Registration using google is not implemented yet.'
                })
                break
            case 'default':
                callback({
                    statusCode: 404,
                    message: 'Registration using a login and a password is not implemented yet.'
                })
                break
            default:
                callback({
                    statusCode: 404,
                    message: 'Sorry, it looks like this type of registration is not implemented.'
                })
        }
    }
}

export default userController
