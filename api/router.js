import express from 'express'
import userRoute from './routes/userRoute'
import mapRoute from './routes/mapRoute'

const router = express.Router()

router.use('/user', userRoute)
router.use('/map', mapRoute)

export default router
