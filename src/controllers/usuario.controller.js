import Usuario from '../models/usuario.model'
import UsuarioTipo from '../models/usuarioTipo.model'
import UsuarioSituacao from '../models/usuarioSituacao.model'
import bcrypt from 'bcrypt-nodejs'
import { 
	verifyJWT, 
	objetoDeRetorno, 
	gerarToken, 
	pegarDataEHoraAtual,
	SITUACAO_ATIVO,
	SITUACAO_INATIVO,
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

exports.salvar = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.nome){
		objetoDeRetorno.menssagem = 'Erro ao salvar usuario - sem dados' 
		return res.json(objetoDeRetorno)
	}

	const elemento = {
		data_criacao: pegarDataEHoraAtual()[0],
		hora_criacao: pegarDataEHoraAtual()[1],
		data_inativacao: null,
		hora_inativacao: null,
		nome: req.body.nome,
		email: req.body.email,
		senha: req.body.senha,
		usuario_tipo_id: req.body.usuario_tipo_id,
		empresa_id: req.body.empresa_id,
	}

	const novoUsuario = new Usuario(elemento)

	novoUsuario.save((err, usuario) => {
		if(err){
			objetoDeRetorno.menssagem = 'Erro ao salvar usuario' 
			return res.json(objetoDeRetorno)
		}
		if(usuario === null){
			objetoDeRetorno.menssagem = 'Sem empresa' 
			return res.json(objetoDeRetorno)
		}

		const elementoAssociativo = {
			data_criacao: pegarDataEHoraAtual()[0],
			hora_criacao: pegarDataEHoraAtual()[1],
			data_inativacao: null,
			hora_inativacao: null,
			situacao_id: SITUACAO_ATIVO,
			usuario_id: usuario._id,
			quem_id: req.body.usuario_id,
		}
		const novoUsuarioSituacao = new UsuarioSituacao(elementoAssociativo)

		novoUsuarioSituacao.save((err, usuarioSituacao) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao salvar usuario situacao' 
				return res.json(objetoDeRetorno)
			}
			if(usuarioSituacao === null){
				objetoDeRetorno.menssagem = 'Sem usuario situacao' 
				return res.json(objetoDeRetorno)
			}

			objetoDeRetorno.ok = true
			objetoDeRetorno.resultado = {
				usuario,
				usuarioSituacao
			}

			return res.json(objetoDeRetorno)
		})
	})
}

exports.remover = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(!req.body.usuario_id){
		objetoDeRetorno.menssagem = 'Erro ao alterar usuario - sem dados' 
		return res.json(objetoDeRetorno)
	}

	UsuarioSituacao.findOne({_id: req.body.usuario_situacao_id}, (err, usuarioSituacao) => {
		usuarioSituacao.data_inativacao = pegarDataEHoraAtual()[0]		
		usuarioSituacao.hora_inativacao = pegarDataEHoraAtual()[1]		
		usuarioSituacao.save((err, lancamento) => {
			if(err){
				objetoDeRetorno.menssagem = 'Erro ao alterar usuario situacao' 
				return res.json(objetoDeRetorno)
			}
			if(usuarioSituacao === null){
				objetoDeRetorno.menssagem = 'Sem usuario situacao'
				return res.json(objetoDeRetorno)
			}

			const elementoAssociativo = {
				data_criacao: pegarDataEHoraAtual()[0],
				hora_criacao: pegarDataEHoraAtual()[1],
				data_inativacao: null,
				hora_inativacao: null,
				situacao_id: req.body.situacao_id,
				usuario_id: req.body.usuario_id,
				quem_id: req.body.quem_id,
			}
			const novoUsuarioSituacao = new UsuarioSituacao(elementoAssociativo)

			novoUsuarioSituacao.save((err, usuarioSituacao) => {
				if(err){
					objetoDeRetorno.menssagem = 'Erro ao salvar usuario situacao' 
					return res.json(objetoDeRetorno)
				}
				if(usuarioSituacao === null){
					objetoDeRetorno.menssagem = 'Sem usuario situacao' 
					return res.json(objetoDeRetorno)
				}

				objetoDeRetorno.ok = true
				objetoDeRetorno.resultado = {
					usuarioSituacao
				}

				return res.json(objetoDeRetorno)
			})
		})
	})
}
