import _ from 'lodash'
import tokenModule from 'token'
import mysql from 'mysql'
import config from '../../config'

tokenModule.defaults.secret = config.token.secret
tokenModule.defaults.timeStep = config.token.timeStep
tokenModule.defaults.cache = config.token.cache

const userModel = {
    register(registrationData) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        switch (registrationData.type) {
            case 'facebook':
                db.connect()
                return new Promise((resolve, reject) => {
                    // check if the user has already logged with facebook
                    const registeredWithFacebookQuery = 'SELECT * FROM user WHERE facebook_id = ?'
                    db.query(registeredWithFacebookQuery,
                        [registrationData.facebook_id],
                        (error, results) => {
                            if (error) {
                                reject({
                                    error
                                })
                            } else if (results.length > 0) {
                                // if the user exist and has already logged in with facebook
                                resolve({
                                    registrationResponse: 'login'
                                })
                            } else {
                                resolve({
                                    registrationResponse: 'update|insert'
                                })
                            }
                        }
                    )
                }).then(({ registrationResponse }) => new Promise((resolve, reject) => {
                    if (registrationResponse === 'login') {
                        resolve({
                            registrationResponse
                        })
                    }
                        // check if the user has already logged in with another middleware
                    const registeredQuery = 'SELECT * FROM user WHERE email = ?'
                    db.query(registeredQuery,
                            [registrationData.email],
                            (error, results) => {
                                if (error) {
                                    reject({
                                        error
                                    })
                                } else if (results.length > 0) {
                                    resolve({
                                        registrationResponse: 'update'
                                    })
                                } else {
                                    resolve({
                                        registrationResponse: 'insert'
                                    })
                                }
                            }
                        )
                })).then(({ registrationResponse }) => new Promise((resolve, reject) => {
                    const updateUserQuery = `UPDATE user 
                        SET facebook_id = ?, facebook_name = ?
                        WHERE email = ?`
                    const insertUserQuery = 'INSERT INTO user SET ?'
                    switch (registrationResponse) {
                        case 'update':
                                // the user exist but has not already logged in with facebook
                            db.query(updateUserQuery, [
                                registrationData.facebook_id,
                                registrationData.facebook_name,
                                registrationData.email
                            ], (error) => {
                                db.end()
                                if (error) {
                                    reject({
                                        error
                                    })
                                } else {
                                    resolve({
                                        registrationResponse
                                    })
                                }
                            })
                            break
                        case 'insert':
                                // the user doesn't exist at all
                            db.query(insertUserQuery, registrationData, (error) => {
                                db.end()
                                if (error) {
                                    reject({
                                        error
                                    })
                                } else {
                                    resolve({
                                        registrationResponse
                                    })
                                }
                            })
                            break
                        case 'login':
                            // the user exist and has already logged in with facebook
                            db.end()
                            resolve({
                                registrationResponse
                            })
                            break
                        default:
                            break
                    }
                }))
            case 'google':
                return new Promise((resolve, reject) => {
                    reject({
                        loginResponse: 'Registration using google is not implemented yet.'
                    })
                })
            case 'default':
                return new Promise((resolve, reject) => {
                    reject({
                        loginResponse: 'Registration using a login and a password is not implemented yet.'
                    })
                })
            default:
                return new Promise((resolve, reject) => {
                    reject({
                        loginResponse: 'Sorry, it looks like this type of registration is not implemented.'
                    })
                })
        }
    },
    login(loginData) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        switch (loginData.type) {
            case 'facebook':
                db.connect()
                return new Promise((resolve, reject) => {
                    // check if the user has already logged with facebook
                    const registeredWithFacebookQuery = 'SELECT * FROM user WHERE facebook_id = ?'
                    db.query(registeredWithFacebookQuery,
                        [loginData.facebook_id],
                        (error, results) => {
                            if (error) {
                                reject({
                                    error
                                })
                            } else if (results.length > 0) {
                                // if the user exists and has already logged in with facebook
                                resolve({
                                    loginResponse: 'ok',
                                    userId: results[0].id
                                })
                            } else {
                                resolve({
                                    loginResponse: 'noUser'
                                })
                            }
                        }
                    )
                }).then(({ loginResponse, userId }) => {
                    switch (loginResponse) {
                        case 'ok':
                            return userModel.getToken({
                                userId
                            }).then(
                                ({ getTokenResponse, token }) => new Promise((resolve, reject) => {
                                    switch (getTokenResponse) {
                                        case 'ok':
                                            resolve({
                                                loginResponse: getTokenResponse,
                                                token
                                            })
                                            break
                                        case 'noUser':
                                        case 'noUserId':
                                        default:
                                            reject({
                                                loginResponse: getTokenResponse
                                            })
                                            break
                                    }
                                })
                            )
                        case 'noUser':
                        default:
                            return new Promise((resolve, reject) => {
                                reject({
                                    loginResponse
                                })
                            })
                    }
                })
            case 'google':
                return new Promise((resolve, reject) => {
                    reject({
                        loginResponse: 'Login using google is not implemented yet.'
                    })
                })
            case 'default':
                return new Promise((resolve, reject) => {
                    reject({
                        loginResponse: 'Login using a login and a password is not implemented yet.'
                    })
                })
            default:
                return new Promise((resolve, reject) => {
                    reject({
                        loginResponse: 'Sorry, it looks like this type of login is not implemented.'
                    })
                })
        }
    },
    getToken({ userId }) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        return new Promise((resolve, reject) => {
            if (_.isUndefined(userId)) {
                reject({
                    getTokenResponse: 'noUserId'
                })
            } else {
                const getUserDataQuery = 'SELECT * FROM user WHERE id = ?'
                db.query(getUserDataQuery, [userId], (error, results) => {
                    if (results.length === 0) {
                        reject({
                            getTokenResponse: 'noUser'
                        })
                    } else {
                        // the user exists
                        // get the current time + 1 step in seconds
                        const expiresOn = Date.now() + (config.token.timeStep * 1000)
                        // generate a new token
                        const token = JSON.stringify({
                            userId,
                            expiresOn,
                            auth: tokenModule.generate(`${userId}`)
                        })
                        resolve({
                            getTokenResponse: 'ok',
                            token
                        })
                    }
                })
            }
        })
    },
    verifyToken({ token }) {
        try {
            const parsedToken = JSON.parse(token)
            const userId = parsedToken.userId
            const auth = parsedToken.auth
            return {
                validToken: tokenModule.verify(`${userId}`, auth),
                userId
            }
        } catch (e) {
            return false
        }
    },
    getProfile({ userId }) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        return new Promise((resolve, reject) => {
            const getUserDataQuery = 'SELECT * FROM user WHERE id = ?'
            db.query(getUserDataQuery, [userId], (error, results) => {
                if (error) {
                    reject({ error })
                }
                if (results.length === 0) {
                    reject({
                        getProfileResponse: 'noUserFound'
                    })
                }
                resolve({
                    getProfileResponse: 'ok',
                    data: results[0]
                })
            })
        })
    }
}

export default userModel
