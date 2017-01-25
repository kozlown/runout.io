// global configuration
const config          = require('./config')

// Express server
express          = require('express')
const app        = express()

// API
let api          = require('./api/index')

// Website Frontend
let front        = require('./front/index')

// Games Router
let games_router = require('./games_router/index')


app.use('/api', api.router)
app.use('/app', front.router)
//app.use(games_router.router)

app.listen(config.port, () => {
	console.log(`Server now listening on port ${ config.port }.`)
})
