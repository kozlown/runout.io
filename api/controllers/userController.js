import _ from 'lodash'
import request from 'request'
import userModel from '../models/userModel'

const userController = {
    register({ registrationType, facebookToken }, callback) {
        switch (registrationType) {
            case 'facebook':
                if (_.isUndefined(facebookToken)) {
                    callback({
                        statusCode: 400,
                        message: 'You must provide facebookToken parameter.'
                    })
                }
                // ask facebook about the user
                new Promise((resolve, reject) => {
                    request.get({
                        url: 'https://graph.facebook.com/me',
                        qs: {
                            access_token: facebookToken,
                            fields: 'id,email,name'
                        }
                    }, (err, res, facebookResponse) => {
                        if (err || _.isUndefined(res)) {
                            // if there is an error with the request
                            reject({
                                error: {
                                    statusCode: 500,
                                    message: 'The request to Facebook failed, please contact the support for further information.'
                                }
                            })
                        } else if (res.statusCode !== 200) {
                            // if facebook response is unsuccessful
                            reject({
                                facebookResponse
                            })
                        }
                        // if facebook response is successful
                        resolve(JSON.parse(facebookResponse))
                    })
                })
                // if facebook recovery succeed
                .then(facebookResponse => userModel.register({
                    facebook_name: facebookResponse.name,
                    facebook_id: facebookResponse.id,
                    email: facebookResponse.email
                }))
                // if everything is ok
                .then(({ registrationResponse }) => {
                    switch (registrationResponse) {
                        case 'update':
                            callback({
                                statusCode: 200,
                                message: 'The user has been successfully updated with facebook data.'
                            })
                            break
                        case 'insert':
                            callback({
                                statusCode: 201,
                                message: 'The new user has been successfully created.'
                            })
                            break
                        case 'login':
                            callback({
                                statusCode: 200,
                                message: 'Nothing to do, the user has already logged in with facebook.'
                            })
                            break
                        default:
                            break
                    }
                })
                // if something failed
                .catch(({ facebookResponse, registrationResponse, error }) => {
                    // if facebook recovery failed
                    if (!_.isUndefined(facebookResponse)) {
                        callback({
                            statusCode: 401,
                            message: 'Data recovery from Facebook failed, see the Facebook\'s response below.',
                            facebookResponse
                        })
                    } else if (!_.isUndefined(registrationResponse)) {
                        // if registration failed
                        callback({
                            statusCode: 400,
                            registrationResponse
                        })
                    } else if (!_.isUndefined(error)) {
                        callback({
                            statusCode: 500,
                            error
                        })
                    } else {
                        callback({
                            statusCode: 500,
                            message: 'Should never arrive there, please contact the support for further information.'
                        })
                    }
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
