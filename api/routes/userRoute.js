import express from 'express'
import userController from '../controllers/userController'

const userRoute = new express.Router()

userRoute.post('/register', (req, res, next) => {
    userController.register(req.query || {}, (response) => {
        res.status(response.statusCode).json(response)
    })
})

export default userRoute
