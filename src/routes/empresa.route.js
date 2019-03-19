import express from 'express'
import controller from '../controllers/empresa.controller'

const router = express.Router()
router.get('/todos', controller.todos)
router.get('/empresaTipo', controller.empresaTipo)
router.get('/contaFixa', controller.contaFixa)
router.get('/lancamento', controller.lancamento)
router.get('/lancamentoSituacao', controller.lancamentoSituacao)
router.post('/lancarUm', controller.lancarUm)
router.post('/lancarVarios', controller.lancarVarios)
router.post('/alterarLancamento', controller.alterarLancamento)
router.post('/removerLancamento', controller.removerLancamento)
router.post('/salvar', controller.salvar)
router.post('/salvarContaFixa', controller.salvarContaFixa)
router.post('/removerContaFixa', controller.removerContaFixa)

module.exports = router
