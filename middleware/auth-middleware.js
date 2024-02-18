const tokenService = require('../tokens/tokenService')
module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers?.authorization || ''
        const accessToken = authorizationHeader.split(' ')[1] || null
        const userDate = tokenService.validateAccessToken(accessToken)

        if(!authorizationHeader || !accessToken || !userDate) {
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }

        req.user = userDate
        next()
    }
    catch (e) {
        return res.status(401).json({message: 'Пользователь не авторизован'})
    }
}