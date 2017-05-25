import _ from 'lodash'
import stackinfo from 'stackinfo'
import request from 'request'
import config from '../../config'
import usualErrors from '../errors/usualErrors'
import mapModel from '../models/mapModel'

const mapController = {
    getMap({ mapName, password }, callback) {
        mapModel.getMap({ mapName, password })
        .then(({ getMapResponse }) => {
            callback({
                statusCode: 400,
                data: getMapResponse
            })
        })
        .catch(({ getMapResponse, checkPasswordResponse, error }) => {
            if (!_.isUndefined(getMapResponse)) {
                callback({
                    statusCode: 400,
                    getMapResponse
                })
            } else if (!_.isUndefined(checkPasswordResponse)) {
                callback({
                    statusCode: 400,
                    checkPasswordResponse
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
    },
    newMap({ mapData, password, isPrivate }, callback) {
        mapModel.newMap({ mapName, password })
        .then(({ getMapResponse }) => {
            callback({
                statusCode: 400,
                data: getMapResponse
            })
        })
        .catch(({ getMapResponse, checkPasswordResponse, error }) => {
            if (!_.isUndefined(getMapResponse)) {
                callback({
                    statusCode: 400,
                    getMapResponse
                })
            } else if (!_.isUndefined(checkPasswordResponse)) {
                callback({
                    statusCode: 400,
                    checkPasswordResponse
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
    },
    updateMap({ mapData, mapName, password }, callback) {

    },
    addImage({ mapName, imageData }, callback) {

    }
}

export default mapController
