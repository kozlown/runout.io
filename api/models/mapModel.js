import _ from 'lodash'
import mysql from 'mysql'
import bcrypt from 'bcryptjs'
import config from '../../config'
import userModel from '../models/userModel'

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
                getMapResponse: `The map '${mapName}' doesn't exist.`
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
    newMap({ mapName, mapData, password, isPrivate, userId }) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        // check if the map does already exist
        return mapModel.mapExists({ mapName })
        // if the map doesn't exist, insert it
        .then((mapExists) => {
            if (mapExists) {
                return new Promise((resolve, reject) => {
                    reject({
                        newMapResponse: 'mapExist'
                    })
                })
            }
            return new Promise((resolve, reject) => {
                if (_.isUndefined(password) && isPrivate) {
                    return reject({
                        newMapResponse: 'privateMapNeedPassword'
                    })
                }
                if (_.isUndefined(isPrivate)) {
                    isPrivate = false
                }
                if (_.isUndefined(password)) {
                    return resolve('')
                }
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return reject({ error: err })
                    }
                    bcrypt.hash(password, salt, (error, hash) => {
                        if (error) {
                            return reject({ error })
                        }
                        resolve(hash)
                    })
                })
            })
            .then(hash => new Promise((resolve, reject) => {
                const insertMapQuery = 'INSERT INTO map SET ?'
                if (_.isUndefined(mapData)) {
                    return reject({
                        newMapResponse: 'NeedMapData'
                    })
                }
                let mapDataString = null
                try {
                    mapDataString = JSON.stringify(JSON.parse(mapData))
                } catch (error) {
                    return reject({ error })
                }
                const insertMapValues = {
                    name: mapName,
                    data: mapDataString,
                    password: hash,
                    private: isPrivate,
                    owner: userId
                }
                db.query(insertMapQuery, insertMapValues, (error) => {
                    if (error) {
                        reject({ error })
                    } else {
                        resolve({
                            newMapResponse: 'ok'
                        })
                    }
                })
            }))
        })
    },
    updateMap({ mapData, mapName, userId }) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        // check if the map exists
        return mapModel.mapExists({ mapName })
        // check the password for the map (if private)
        .then((mapExists) => {
            if (mapExists) {
                return mapModel.checkOwner({ mapName, userId })
            }
            return new Promise((resolve, reject) => reject({
                updateMapResponse: `The map '${mapName}' doesn't exist.`
            }))
        })
        // update map if authorized
        .then((passwordIsValid) => {
            if (passwordIsValid) {
                // check if the new mapData has a valid JSON format
                let mapDataString = null
                try {
                    mapDataString = JSON.stringify(JSON.parse(mapData))
                } catch (error) {
                    return new Promise((resolve, reject) => reject({ error }))
                }
                // update the map
                const updateMapQuery = 'UPDATE map SET data = ? WHERE name = ?'
                return new Promise((resolve, reject) => {
                    db.query(updateMapQuery, [mapDataString, mapName], (error) => {
                        if (error) {
                            return reject({ error })
                        }
                        return resolve({
                            updateMapResponse: 'ok'
                        })
                    })
                })
            }
            return new Promise((resolve, reject) => reject({
                checkPasswordResponse: 'The provided password is invalid.'
            }))
        })
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
    },
    checkOwner({ mapName, userId }) {
        const db = mysql.createConnection({
            ...config.database,
            debug: false
        })
        return new Promise((resolve, reject) => {
            const checkOwnerQuery = 'SELECT * FROM map WHERE owner = ? AND name = ?'
            db.query(checkOwnerQuery, [userId, mapName], (error, results) => {
                if (error) {
                    return reject({
                        error
                    })
                }
                return resolve(results.length > 0)
            })
        })
    }
}

export default mapModel
