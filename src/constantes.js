import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

/* Constantes */
export let objetoDeRetorno = {}
objetoDeRetorno.ok = false 
objetoDeRetorno.menssagem = ''
objetoDeRetorno.resultado = {}

const SEGREDO = '123'

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
