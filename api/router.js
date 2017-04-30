import express from 'express'
import userRoute from './routes/userRoute'

const router = express.Router()

router.use('/user', userRoute)

module.exports = router;
