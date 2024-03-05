const authService = require('./authService')
const bcrypt = require('bcrypt')
const tokenService = require('../tokens/tokenService')
const nodemailer = require('nodemailer')

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

        const tokens = await this.authService.register({email, nickname, password: hashPassword})

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

        if (candidate && isCompare) {
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

    async setPassword(req, res) {
        // TODO написать логику
    }
}

module.exports = new AuthController(authService, bcrypt, tokenService)