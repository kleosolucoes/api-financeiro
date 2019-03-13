import Empresa from '../models/empresa.model'
import EmpresaTipo from '../models/empresaTipo.model'
import ContaFixa from '../models/contaFixa.model'
import Usuario from '../models/usuario.model'
import Lancamento from '../models/lancamento.model'
import LancamentoSituacao from '../models/lancamentoSituacao.model'
import { 
		objetoDeRetorno, 
} from '../constantes'

exports.todos = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	Empresa.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar empresas' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem empresas' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.empresaTipo = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	EmpresaTipo.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar empresa tipo' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem empresa tipo' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.contaFixa = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	ContaFixa.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar conta fixa' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem conta fixa' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.lancamento = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	Lancamento.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar lançamentos' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem Lançamentos' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.lancamentoSituacao = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	LancamentoSituacao.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar lançamento situacao' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem Lançamento Situacao' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}
