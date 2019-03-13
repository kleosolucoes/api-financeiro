import Usuario from '../models/usuario.model'
import UsuarioTipo from '../models/usuarioTipo.model'
import UsuarioSituacao from '../models/usuarioSituacao.model'
import bcrypt from 'bcrypt-nodejs'
import { 
		verifyJWT, 
		objetoDeRetorno, 
		gerarToken, 
} from '../constantes'

exports.teste = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	const passwordString = 123
	bcrypt.hash(passwordString, null, null, (err, hashPassword) => {
		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			hash: hashPassword,
			foo: 'bar',
		}
		res.json(objetoDeRetorno)
	})
}

exports.login = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	const senha = req.body.senha + ''
	Usuario.findOne({email: req.body.email}, (err, elemento) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar usuario' 
			return res.json(objetoDeRetorno)
		}
		if(elemento === null){
			objetoDeRetorno.menssagem = 'Usuário não encontrado' 
			return res.json(objetoDeRetorno)
		}
		bcrypt.compare(senha, elemento.senha, (err, result) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao comparar senha'
				return res.json(objetoDeRetorno)
			}
			if(!result){
				objetoDeRetorno.menssagem = 'Senha não confere'
				return res.json(objetoDeRetorno)
			}
			/* senha correta */
			const token = gerarToken(elemento.id)
			objetoDeRetorno.ok = true
			objetoDeRetorno.resultado = {
				token,
				usuario_id: elemento.id,
				empresa_id: elemento.empresa_id,
			}
			res.json(objetoDeRetorno)
		})
	})
}

exports.todos = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	Usuario.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar usuarios' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem usuários' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.usuarioTipo = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	UsuarioTipo.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar usuario tipo' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem usuário tipo' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}

exports.usuarioSituacao = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	UsuarioSituacao.find({}, (err, elementos) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao buscar usuario situação' 
			return res.json(objetoDeRetorno)
		}
		if(elementos === null){
			objetoDeRetorno.menssagem = 'Sem usuário situação' 
			return res.json(objetoDeRetorno)
		}

		objetoDeRetorno.ok = true
		objetoDeRetorno.resultado = {
			elementos,
		}
		return res.json(objetoDeRetorno)
	})
}
