import express from 'express'
import mapController from '../controllers/mapController'
import userController from '../controllers/userController'

const userRoute = new express.Router()

userRoute.get('/:name', (req, res) => {
    const password = req.query.password
    const mapName = req.params.name
    mapController.getMap({ mapName, password }, (response) => {
        res.status(response.statusCode).json(response)
    })
})
userRoute.all('*', (req, res, next) => {
    const token = req.cookies.token
    userController.verifyToken({ token }, (response) => {
        if (response.validToken) {
            req.userId = response.userId
            next()
        } else {
            res.status(403).json({
                statusCode: 403,
                message: 'This token is invalid, login to get a new valid token.'
            })
        }
    })
})
userRoute.post('/:name', (req, res) => {
    const password = req.query.password
    const mapData = req.query.data
    const isPrivate = req.query.private
    const mapName = req.params.name
    const userId = req.userId
    mapController.newMap({ mapName, mapData, password, isPrivate, userId }, (response) => {
        res.status(response.statusCode).json(response)
    })
})
userRoute.put('/:name', (req, res) => {
    const mapData = req.query.data
    const mapName = req.params.name
    const userId = req.userId
    mapController.updateMap({ mapName, mapData, userId }, (response) => {
        res.status(response.statusCode).json(response)
    })
})

export default userRoute
