import express from 'express'
import controller from '../controllers/usuario.controller'
import { verifyJWT } from '../constantes'

const router = express.Router()
router.get('/teste', controller.teste)
router.post('/login', controller.login)
router.get('/todos', verifyJWT, controller.todos)
router.get('/usuarioTipo', verifyJWT, controller.usuarioTipo)
router.get('/usuarioSituacao', verifyJWT, controller.usuarioSituacao)

module.exports = router