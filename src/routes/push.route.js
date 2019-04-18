import express from 'express'
import controller from '../controllers/push.controller'

const router = express.Router()
router.post('/inscrever', controller.inscrever)
router.get('/notificar', controller.notificar)

module.exports = router
