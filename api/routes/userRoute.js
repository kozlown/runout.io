import express from 'express'
import userController from '../controllers/userController'

const userRoute = new express.Router()

userRoute.post('/register', (req, res) => {
    userController.register(req.body || {}, (response) => {
        res.status(response.statusCode).json(response)
    })
})
userRoute.post('/login', (req, res) => {
    userController.login(req.body || {}, (response) => {
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
userRoute.get('/token', (req, res) => {
    const userId = req.query.userId
    userController.getToken({ userId }, (response) => {
        res.status(response.statusCode).json(response)
    })
})
userRoute.get('/profile', (req, res) => {
    const userId = req.query.userId || req.userId
    userController.getProfile({ userId }, (response) => {
        res.status(response.statusCode).json(response)
    })
})
userRoute.put('/pseudo', (req, res) => {
    const userId = req.userId
    const pseudo = req.body.pseudo
    userController.setPseudo({ userId, pseudo }, (response) => {
        res.status(response.statusCode).json(response)
    })
})
export default userRoute
