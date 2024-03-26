const authService = require('./authService')
const bcrypt = require('bcrypt')
const tokenService = require('../tokens/tokenService')
const transporter = require('../config/nodemailer')
const { v4: uuidv4 } = require('uuid')
const {response} = require("express");

class AuthController {
    constructor(authService, bcrypt, tokenService) {
        this.authService = authService
        this.bcrypt = bcrypt
        this.tokenService = tokenService
    }

    async register(req, res) {
        const {email, nickname, password} = req.body

        const candidate = await this.authService.getUserByEmail(email)

        if (candidate) {
            return res.status(400).json({message: 'Пользователь с таким email существует'})
        }

        const hashPassword = await this.bcrypt.hash(password, 5)

        const activationKey = uuidv4()

        const tokens = await this.authService.register({email, nickname, password: hashPassword, activationKey})

        transporter.sendMail({
            from: 'coder27sinitsyn@gmail.com',
            to: email,
            subject: 'Ссылка активации пользователя',
            html: `<div><h1>Ваша ссылка активации регистрации</h1><a href="http://localhost:8080/activate/${activationKey}">Ссылка для активации</a></div>`
        }, (error, info) => {
            if (error) {
                response.json({ message: 'Произошла ошибка ' + error })
            } else {
                response.json({ message: 'Регистрация прошла успешно, перейдите по ссылке емайле' })
            }
        })

        res.cookie('refreshToken', tokens.refreshToken)
        return res.status(200).json(tokens)
    }

    async login (req, res) {
        const {email, password} = req.body
        const candidate = await this.authService.getUserByEmail(email)

        if (!candidate) {
            return res.status(400).json({message: "Пользователя с таким email не существует"})
        }

        const isCompare = await this.bcrypt.compare(password, candidate.password)

        if (candidate && isCompare && candidate.isActivated) {
            const token = await this.authService.login(candidate)
            res.cookie('refreshToken', token.refreshToken).status(200).json(token)
        }
    }

    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies

            if(!refreshToken) {
                return res.status(401).json({message: 'Пользователь не авторизован'})
            }
            const data = await this.authService.refreshToken(refreshToken)

            res.cookie('refreshToken', data.refreshToken)
            res.status(200).json(data)
        }
        catch (e) {
            res.status(403).json({message: 'deny'})
        }
    }

    async activateUser(req, res) {
        const { key } = req.params
        const activatedUser = await this.authService.activateUser(key)
        res.json(activatedUser)
    }

    async setPassword(req, res) {
        // TODO написать логику
    }
}

module.exports = new AuthController(authService, bcrypt, tokenService)