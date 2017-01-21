const configs               = require('./configs')
express                     = require('express')
const app                   = express()

let api                     = require('./api/index')
let front                   = require('./front/index')
let games_router            = require('./games_router/index')


app.use('/api', api.router)
app.use('/app', front.router)
//app.use(games_router.router)


app.listen(configs.port, () => {
	console.log(`Server now listening on port ${ configs.port }.`)
})
