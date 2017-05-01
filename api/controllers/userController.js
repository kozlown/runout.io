import _ from 'lodash'
import stackinfo from 'stackinfo'
import request from 'request'
import usualErrors from '../errors/usualErrors'
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
                                    message: 'The request to Facebook failed, please contact the support for further information.'
                                }
                            })
                        } else if (res.statusCode !== 200) {
                            // if facebook response is unsuccessful
                            reject({
                                facebookResponse
                            })
                        } else {
                            // if facebook response is successful
                            try {
                                resolve(JSON.parse(facebookResponse))
                            } catch (e) {
                                reject({
                                    facebookResponse
                                })
                            }
                        }
                    })
                })
                // if facebook recovery succeed
                .then(facebookResponse => userModel.register({
                    type: registrationType,
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
                            userController.login({
                                loginType: registrationType,
                                facebookToken
                            }, callback)
                            break
                        default:
                            callback(usualErrors.never(stackinfo()))
                            break
                    }
                })
                // if something failed
                .catch(({ facebookResponse, registrationResponse, error }) => {
                    if (!_.isUndefined(facebookResponse)) {
                        // if facebook recovery failed
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
                        callback(usualErrors.never(stackinfo()))
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
    },
    login({ loginType, facebookToken }, callback) {
        switch (loginType) {
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
                                    message: 'The request to Facebook failed, please contact the support for further information.'
                                }
                            })
                        } else if (res.statusCode !== 200) {
                            // if facebook response is unsuccessful
                            reject({
                                facebookResponse
                            })
                        } else {
                            // if facebook response is successful
                            try {
                                resolve(JSON.parse(facebookResponse))
                            } catch (e) {
                                reject({
                                    facebookResponse
                                })
                            }
                        }
                    })
                })
                // if facebook recovery succeed
                .then(facebookResponse => userModel.login({
                    type: loginType,
                    facebook_id: facebookResponse.id
                }))
                // if everything is ok
                .then(({ loginResponse, token }) => {
                    switch (loginResponse) {
                        case 'ok':
                            callback({
                                statusCode: 200,
                                message: 'Login via facebook was successful, see your access token below.',
                                token
                            })
                            break
                        case 'noUser':
                            // if the user doesn't exist, try to register
                            userController.register({
                                registrationType: loginType,
                                facebookToken
                            }, callback)
                            break
                        default:
                            callback(usualErrors.never(stackinfo()))
                            break
                    }
                })
                // if something failed
                .catch(({ facebookResponse, loginResponse, getTokenResponse, error }) => {
                    if (!_.isUndefined(facebookResponse)) {
                        // if facebook recovery failed
                        callback({
                            statusCode: 401,
                            message: 'Data recovery from Facebook failed, see the Facebook\'s response below.',
                            facebookResponse
                        })
                    } else if (!_.isUndefined(loginResponse)) {
                        // if login failed
                        callback({
                            statusCode: 400,
                            loginResponse
                        })
                    } else if (!_.isUndefined(getTokenResponse)) {
                        // if token generation failed
                        callback({
                            statusCode: 400,
                            getTokenResponse
                        })
                    } else if (!_.isUndefined(error)) {
                        callback({
                            statusCode: 500,
                            error
                        })
                    } else {
                        callback(usualErrors.never(stackinfo()))
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
                break
        }
    },
    verifyToken({ token }, callback) {
        callback(userModel.verifyToken({ token }))
    },
    getProfile({ userId }, callback) {
        userModel.getProfile({ userId }).then(({ getProfileResponse, data }) => {
            switch (getProfileResponse) {
                case 'ok':
                    callback({
                        statusCode: 200,
                        data
                    })
                    break
                default:
                    callback(usualErrors.never(stackinfo()))
                    break
            }
        })
    }
}

export default userController
