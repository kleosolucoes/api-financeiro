import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

/* Constantes */
export let objetoDeRetorno = {}
objetoDeRetorno.ok = false 
objetoDeRetorno.menssagem = ''
objetoDeRetorno.resultado = {}

const SEGREDO = 'rjXePKbm7AA9kcgOlVw6cfJnjt_cnWFIOqUz36rUKDk'

export const publicKey = "BLHCbFqkY_001v2441pITZWI3mcBskw_gVuLqxzI-FEw-INIemr8u2bJpQmPeSRi1pJ7kpbTJe9VfddJNQ_ZmQk"
export const privateKey = "_kXi4IMm-Skq3vta0yevTl4XgNB80IC9_hIEVlBEVTQ"

export const SITUACAO_NAO_RECEBIDO = '5c880d6dfb6fc0720133a13c'
export const USUARIO_SISTEMA = '5c87ff9bfb6fc07201339410'

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
