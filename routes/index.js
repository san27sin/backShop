const { Router } = require('express')
const router = Router()

const categoriesRoutes = require('../categories/categoriesRoutes')
const advantagesRoutes = require('../advantages/advantagesRoutes')
const phonesRoutes = require('../phones/phonesRoutes')
const socialNetRoutes = require('../socialNetwork/socialNetworkRoutes')

router.use('/categories', categoriesRoutes)
router.use('/advantages', advantagesRoutes)
router.use('/phones', phonesRoutes)
router.use('/socialNetwork', socialNetRoutes)
module.exports = router;