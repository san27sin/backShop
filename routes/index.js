const { Router } = require('express')
const router = Router()

const categoriesRoutes = require('../categories/categoriesRoutes')
const advantagesRoutes = require('../advantages/advantagesRoutes')
const phonesRoutes = require('../phones/phonesRoutes')
const socialNetRoutes = require('../socialNetwork/socialNetworkRoutes')
const authRoutes = require('../auth/authRoutes')

router.use('/categories', categoriesRoutes)
router.use('/advantages', advantagesRoutes)
router.use('/auth', authRoutes)
router.use('/phones', phonesRoutes)
router.use('/socialNetwork', socialNetRoutes)
module.exports = router;