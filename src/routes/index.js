const express = require('express')
//variavel responsável pelas rotas
const routes = express.Router()

//Requisição dos controllers
const HomeController = require('../app/controllers/HomeController')


const users = require('./users')
const products = require('./products')

// Home
routes.get('/', HomeController.index) 

routes.use('/users', users)
routes.use('/products', products)

// Alias
routes.get('/ads/create', function(req, res) {
    return res.redirect("/products/create")
})
routes.get('/accounts', function(req, res) {
    return res.redirect("/users/login")
}) 


//exportas os arquivos
module.exports = routes