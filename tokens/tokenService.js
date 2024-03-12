const Model = require('../models/index')
const jwt = require('jsonwebtoken')

class TokenService {
    constructor(tokenRepo, jwtService) {
        this.tokenRepo = tokenRepo
        this.jwtService = jwtService
    }

    generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, 'san27sinAccess', {expiresIn: '1m'})
        const refreshToken = this.jwtService.sign(payload, 'san27sinRefresh', {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        return jwt.verify(token, 'san27sinAccess', )
    }

    validateRefreshToken(token) {
        try {
            return this.jwtService.verify(token, 'san27sinRefresh')
        } catch (e) {
            return { message: e.message}
        }
    }

    async saveToken(data) {
        try {
            const [token, created] = await this.tokenRepo.findOrCreate({where: {userId: data.userId}, defaults: {userId: data.userId, refreshToken: data.refreshToken}})

            if (created) {
                return token
            }

            token.refreshToken = data.refreshToken

            await token.save()

            return token
        } catch (e) {
            return { message: e.message }
        }
    }

    async findOneRefreshToken(refreshToken) {
        return await this.tokenRepo.findOne({where: {refreshToken}})
    }
}

module.exports = new TokenService(Model.Tokens, jwt)