const { Router } = require('express')
const router = Router()

const categoriesRoutes = require('../categories/categoriesRoutes')
const advantagesRoutes = require('../advantages/advantagesRoutes')
const phonesRoutes = require('../phones/phonesRoutes')
const socialNetRoutes = require('../socialNetwork/socialNetworkRoutes')
const authRoutes = require('../auth/authRoutes')
const authMiddleware = require('../middleware/auth-middleware')

router.use('/categories', authMiddleware, categoriesRoutes)
router.use('/advantages', authMiddleware, advantagesRoutes)
router.use('/phones', authMiddleware, phonesRoutes)
router.use('/socialNetwork', authMiddleware, socialNetRoutes)
router.use('/auth', authRoutes)
module.exports = router