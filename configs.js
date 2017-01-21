/**
 * Configs for the whole app
 */

const configs = {
	port        : 3000,
	front       : require('./front/configs.js'),
	api         : require('./api/configs.js'),
	games_router: require('./games_router/configs.js')
}

module.exports = configs
