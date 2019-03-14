import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

/* Constantes */
export let objetoDeRetorno = {}
objetoDeRetorno.ok = false 
objetoDeRetorno.menssagem = ''
objetoDeRetorno.resultado = {}

const SEGREDO = '123'
export const SITUACAO_NAO_RECEBIDO = '5c880d6dfb6fc0720133a13c'
export const SITUACAO_ATIVO = '5c880d9efb6fc0720133a14e'
export const SITUACAO_INATIVO = '5c880daefb6fc0720133a156'

export const verifyJWT = (req, res, next) => {
	let token = req.headers['x-access-token']
	if (!token) {
		objetoDeRetorno.ok = false
		objetoDeRetorno.menssagem = 'Sem token'
		objetoDeRetorno.resultado = {}
		return res
			.status(401)
			.json(objetoDeRetorno)
	}

	jwt.verify(token, SEGREDO, function(err, decoded) {
		if (err) {
			objetoDeRetorno.ok = false
			objetoDeRetorno.menssagem = 'Token invalido'
			objetoDeRetorno.resultado = {}
			return res
				.status(500)
				.json(objetoDeRetorno)
		}
		req.userId = decoded.id
		next()
	})
}

export const gerarToken = (id) => {
	let token = jwt.sign({id}, SEGREDO, {
		expiresIn: 60 * 60 * 24 // 24 horas
	})
	return token
}

export function pegarDataEHoraAtual(){
	let dados = []
	const dataAtual = new Date()
	const diaParaDataDeCriacao = dataAtual.getDate().toString().padStart(2, '0')
	let mesParaDataDeCriacao = dataAtual.getMonth()+1
	mesParaDataDeCriacao = mesParaDataDeCriacao.toString().padStart(2, '0')
	const anoParaDataDeCriacao = dataAtual.getFullYear()
	const dataDeCriacao = diaParaDataDeCriacao + '/' + mesParaDataDeCriacao + '/' + anoParaDataDeCriacao
	const horaDeCriacao = dataAtual.getHours().toString().padStart(2, '0')
		+':'+dataAtual.getMinutes().toString().padStart(2, '0')
		+':'+dataAtual.getSeconds().toString().padStart(2, '0')

	dados.push(dataDeCriacao)                 
	dados.push(horaDeCriacao)

	return dados                              
}
