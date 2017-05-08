/**
 * Configs for the whole app
 */

const config = {
    port: 3000,
    cors: {
        credentials: true,
        allowedOrigins: ['http://localhost:3000', 'http://localhost:3001']
    },
    database: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'runout.io'
    },
    token: {
        timeStep: 7 * 24 * 60 * 60, // 1 week in seconds
        secret: 'secret',
        cache: true
    }
}

export default config
