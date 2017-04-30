import express from 'express'

import config from './config'
import api from './api/index'
import front from './front/index'
// import games_router from '/games_router/index')

const app = express()
app.use('/api', api.router)
app.use('/app', front.router)
// app.use(games_router.router)

app.listen(config.port, () => {
    console.info(`Server now listening on port ${config.port}.`)
})
