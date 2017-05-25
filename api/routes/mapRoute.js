import express from 'express'
import mapController from '../controllers/mapController'

const userRoute = new express.Router()

userRoute.get('/:mapName', (req, res) => {
    const password = req.query.password
    const mapName = req.params.mapName
    mapController.getMap({ mapName, password }, (response) => {
        res.status(response.statusCode).json(response)
    })
})

export default userRoute
