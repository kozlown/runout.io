import express from 'express'
import userController from '../controllers/userController'

const userRoute = new express.Router()

userRoute.post('/register', (req, res) => {
    userController.register(req.query || {}, (response) => {
        res.status(response.statusCode).json(response)
    })
})
userRoute.post('/login', (req, res) => {
    userController.login(req.query || {}, (response) => {
        res.status(response.statusCode).json(response)
    })
})
userRoute.all('*', (req, res, next) => {
    userController.verifyToken(req.query || {}, (response) => {
        if (response.validToken) {
            req.query.userId = response.userId
            next()
        } else {
            res.status(403).json({
                statusCode: 403,
                message: 'This token is invalid, login to get a new valid token.'
            })
        }
    })
})
userRoute.get('/profile', (req, res) => {
    const userId = req.query.userId
    userController.getProfile({ userId }, (response) => {
        res.status(response.statusCode).json(response)
    })
})
export default userRoute
