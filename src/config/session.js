// Configuração da sessão do usuário
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./bd')

module.exports = session({
    store: new pgSession({
        pool: db
    }),

    secret: 'iabadabaduuu',
    resave: false,
    saveUninitialized: false,
    cookie: {
        // tempo maximo para a sessão
        maxAge: 30 * 24* 60 * 60 * 1000
    }
})
