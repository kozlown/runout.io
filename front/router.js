import express from 'express'

const router = express.Router()
router.use(express.static('front/react-app/build'))

export default router
