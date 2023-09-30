const { Router } = require('express');
const router = Router();

const categoriesRoutes = require('../categories/categoriesRoutes');

router.use('/categories', categoriesRoutes);
module.exports = router;