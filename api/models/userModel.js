import _ from 'lodash'
import mysql from 'mysql'
import config from '../../config'

const userModel = {
    register(registrationData) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        db.connect()
        return (new Promise((resolve, reject) => {
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
        }).then(({ registrationResponse }) => {
            return new Promise((resolve, reject) => {
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
            })
        }).then(({ registrationResponse }) => {
            return new Promise((resolve, reject) => {
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
            })
        }))
    }
}

export default userModel
