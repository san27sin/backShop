const { Router } = require('express');
const router = Router();
const categoriesController = require('./categoriesController');

router.get('/',(req, res) => categoriesController.getAll(req, res));
router.post('/', (req, res) => categoriesController.create(req, res));
router.delete('/:id', (req, res) => categoriesController.deleteOne(req, res));
router.patch('/:id', (req, res) => categoriesController.getOne(req, res));
module.exports = router;
