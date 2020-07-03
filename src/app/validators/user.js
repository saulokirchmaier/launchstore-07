const User = require('../models/User')
// requisição para posibilitar a verificação de senha
const { compare } = require('bcryptjs')

function checkAllFields(body) {
    // checar se todos os campos estao preenchidos
    const keys = Object.keys(body)

    for (key of keys) {
        if (body[key] == "") {
            return {
                user: body,
                error: 'Por favor preencha todos os campos.'
            }
        }
    }
}

async function show(req, res, next) {
    const { userId: id } = req.session 

    const user = await User.findOne({ where: {id} })

    if (!user) return res.render("user/register", {
        error: "Usuário não encontrado!"
    })

    req.user = user

    next()
}

async function post(req, res, next) {
    // check all fields
    const fillAllFields = checkAllFields(req.body)
    if ( fillAllFields ){
        return res.render("user/register", fillAllFields)
    }

    // chegar se usuario existe [email, cpf_cnpj unicos]
    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({
        where: { email },
        or: { cpf_cnpj }
    })

    // mensagem caso ja tenha o usuário cadastrado
    if ( user ) return res.render('users/register', {
        user: req.body,
        error: 'Usuário já cadastrado.'
    })

    //checar a senha e a repeticao de senha
    if ( password != passwordRepeat) {
        return res.render('users/register', {
            user: req.body,
            error: 'Senhas não conferem.'
        })
    }

    next()

}

async function update(req, res, next) {
    // check all fields
    const fillAllFields = checkAllFields(req.body)
    if ( fillAllFields ){
        return res.render("users/index", fillAllFields)
    }

    //checa se tem senha
    const { id, password } = req.body

    if ( !password ) return res.render("users/index", {
        user: req.body,
        error: "Coloque sua senha para atualizar seu cadastro!"
    })

    //verificação de senha
    const user = await User.findOne({ where: {id} })

    const passed = await compare(password, user.password)

    if ( !passed ) return res.render("users/index", {
        user: req.body,
        error: "Senha incorreta."
    })

    req.user = user

    next()
}

module.exports = {
    post,
    show, 
    update
}