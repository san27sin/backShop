const userService = require('../users/userService')
const jwt = require('jsonwebtoken')
const tokensService  = require('../tokens/tokenService')

class AuthService {
    constructor(userService, jwt, tokenService) {
        this.userService = userService
        this.jwtService = jwt
        this.tokenService = tokenService
    }

    async register(user) {
        const createdUser = await this.userService.create(user)
        const userDto = {
            id: createdUser.id,
            email: createdUser.email,
            nickname: createdUser.nickname,
            activationKey: createdUser.activationKey
        }
        const tokens = this.tokenService.generateTokens({...userDto})
        await this.tokenService.saveToken({userId: userDto.id, refreshToken: tokens.refreshToken})
        return {
            ...tokens,
            user: userDto
        }
    }

    async login(user) {
        const foundUser = await this.userService.findOne(user.id)

        const userDto = {
            id: foundUser.id,
            email: foundUser.email,
            nickname: foundUser.nickname
        }

        const tokens = this.tokenService.generateTokens(({...userDto}))
        await this.tokenService.saveToken({userId: userDto.id, refreshToken: tokens.refreshToken})
        return {
            ...tokens,
            user: userDto
        }
    }

    async refreshToken(refreshToken) {
        const userData = this.tokenService.validateRefreshToken(refreshToken)
        //const tokenFromDb = await this.tokenService.findOneRefreshToken(refreshToken)

        if (userData.message) {
            throw new Error('Проблема с токеном')
        }

        const user = await this.userService.findOne(userData.id)

        const userDto = {
            id: user.id,
            email: user.email,
            nickname: user.nickname
        }

        const tokens = this.tokenService.generateTokens({...userDto})
        await this.tokenService.saveToken({userId: userDto.id, refreshToken: tokens.refreshToken})
        return {
            ...tokens,
            user: userDto
        }
    }

    async getUserByEmail(email) {
        return await this.userService.getUserByEmail(email)
    }

    async activateUser(key) {
        return this.userService.activateUser(key)
    }
}

module.exports = new AuthService(userService, jwt, tokensService)