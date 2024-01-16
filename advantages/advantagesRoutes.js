const { Router } = require('express')
const router = Router()
const advantagiesController = require('./advantagesController')

router.get('/', (req, res) => advantagiesController.getAll(req, res))
router.post('/', (req, res) => advantagiesController.create(req, res))
router.delete('/:id', (req, res) => advantagiesController.deleteOne(req, res))
router.patch('/', (req, res) => advantagiesController.update(req, res))
module.exports = router