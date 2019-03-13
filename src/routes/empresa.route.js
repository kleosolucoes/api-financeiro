import express from 'express'
import controller from '../controllers/empresa.controller'

const router = express.Router()
router.get('/todos', controller.todos)
router.get('/empresaTipo', controller.empresaTipo)
router.get('/contaFixa', controller.contaFixa)
router.get('/lancamento', controller.lancamento)
router.get('/lancamentoSituacao', controller.lancamentoSituacao)

module.exports = router
