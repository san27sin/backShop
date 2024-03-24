const { Router } = require('express')
const router = Router()

const authController = require('./authController')

router.post('/register', (req, res) => authController.register(req, res))
router.post('/login', (req, res) => authController.login(req, res))
router.post('/set-password', (req, res) => authController.setPassword(req, res)) // не создавал такой метож в контроллере
router.get('/refresh', (req, res) => authController.refresh(req, res))
router.patch('/activate/:key', (req, res) => authController.activateUser(req, res))
module.exports = router



