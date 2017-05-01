/**
 * Configs for the whole app
 */

const config = {
    port: 3000,
    database: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'runout.io'
    },
    token: {
        timeStep: 24 * 60 * 60,
        secret: 'c\'est génial !', // 24h in seconds
        cache: true
    }
}

export default config
