const { Router } = require('express')
const router = Router()
const socialNetController = require('./socialNetworkController')

router.get('/', (req, res) => socialNetController.getAll(req, res))
router.post('/', (req, res) => socialNetController.create(req, res))
router.delete('/:id', (req, res) => socialNetController.deleteOne(req, res))
router.patch('/', (req, res) => socialNetController.update(req, res))
module.exports = router