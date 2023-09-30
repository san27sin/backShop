const { Router } = require('express');
const router = Router();
const categoriesController = require('./categoriesController');

router.get('/',(req, res) => categoriesController.getAll(req, res));

module.exports = router;
