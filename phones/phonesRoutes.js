const { Router } = require('express')
const router = Router()
const phonesController = require('./phonesController')

router.get('/', (req, res) => phonesController.getAll(req,res))
router.post('/', (req, res) => phonesController.create(req, res))
router.delete('/:id', (req, res) => phonesController.deleteOne(req, res))
router.patch('/', (req, res) =>phonesController.update(req, res))
module.exports = router