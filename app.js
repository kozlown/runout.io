import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import config from './config'
import api from './api/index'
import front from './front/index'
// import games_router from '/games_router/index')

const app = express()
app.use(cors({
    origin: config.cors.allowedOrigins,
    credentials: config.cors.credentials
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', api.router)
app.use('/app', front.router)
// app.use(games_router.router)

app.listen(config.port, () => {
    console.info(`Server now listening on port ${config.port}.`)
})
