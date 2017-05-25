import _ from 'lodash'
import mysql from 'mysql'
import bcrypt from 'bcryptjs'
import config from '../../config'

const mapModel = {
    getMap({ mapName, password }) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        // check if the map exists
        return mapModel.mapExists({ mapName })
        // check the password for the map (if private)
        .then((mapExists) => {
            if (mapExists) {
                return mapModel.checkPassword({ mapName, password })
            }
            return new Promise((resolve, reject) => reject({
                getMapResponse: `The map '${ mapName }' doesn't exist.`
            }))
        })
        // send map if authorized
        .then((passwordIsValid) => {
            if (passwordIsValid) {
                return new Promise((resolve, reject) => {
                    const getMapQuery = 'SELECT data FROM map WHERE name = ?'
                    db.query(getMapQuery, [mapName], (error, results) => {
                        if (error) {
                            reject({ error })
                        }
                        // return the map
                        resolve({
                            getMapResponse: results[0]
                        })
                    })
                })
            }
            return new Promise((resolve, reject) => reject({
                checkPasswordResponse: 'The provided password is invalid.'
            }))
        })
    },
    newMap({ mapData, password }) {

    },
    updateMap({ mapData, mapName, password }) {

    },
    addImage({ mapName, imageData }) {

    },
    checkPassword({ mapName, password }) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        // check if the map is private
        return new Promise((resolve, reject) => {
            // check if the map is private
            const checkPrivateQuery = 'SELECT private FROM map WHERE name = ?'
            db.query(checkPrivateQuery, [mapName], (error, results) => {
                if (error) {
                    reject({ error })
                } else {
                    resolve(results[0].private)
                }
            })
        })
        // if the map is not private then return true
        // else check if password is valid
        .then(isPrivate => new Promise((resolve, reject) => {
            // if the map is not private
            if (!isPrivate) {
                return resolve(true)
            }
            const getPasswordHash = 'SELECT password FROM map WHERE name = ?'
            db.query(getPasswordHash, [mapName], (error, results) => {
                if (error) {
                    return reject({ error })
                }
                if (_.isUndefined(password)) {
                    return resolve(false)
                }
                const hash = results[0].password
                bcrypt.compare(password, hash).then((isValid) => {
                    if (isValid) {
                        resolve(true)
                    } else {
                        return resolve(false)
                    }
                })
            })
        }))
    },
    mapExists({ mapName }) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        return new Promise((resolve, reject) => {
            const checkMapExistsQuery = 'SELECT id FROM map WHERE name = ?'
            db.query(checkMapExistsQuery, [mapName], (error, results) => {
                if (error) {
                    reject({ error })
                } else if (results.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }
}

export default mapModel
