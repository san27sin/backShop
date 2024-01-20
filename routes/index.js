const { Router } = require('express')
const router = Router()

const categoriesRoutes = require('../categories/categoriesRoutes')
const advantagesRoutes = require('../advantages/advantagesRoutes')

router.use('/categories', categoriesRoutes)
router.use('/advantages', advantagesRoutes)
module.exports = router;