/* Constantes */
import No from './models/no.model'
import jwt from 'jsonwebtoken'
import randtoken from 'rand-token'
import nodemailer from 'nodemailer'
import dotenvsafe from 'dotenv-safe'
//dotenvsafe.load()

export let objetoDeRetorno = {}
objetoDeRetorno.status = 'error'
objetoDeRetorno.code = 200
objetoDeRetorno.message = ''
objetoDeRetorno.result = {}

const SECRET= '|d^AlXbMyXsc4.IL'
export const ID_SITUACAO_A_LIGAR = '5c02c32afb6fc038cbb0bf5a'
export const PRIVATE_KEY = 'ZgGz-Lup5rlsxeVTfjKihORwKOdpu_Q6IzgpMAo0234'
export const PUBLIC_KEY = 'BOUz72Vd9j4XyQVMIQWWjI6Hv3h-Tuot3IHnq816mI-ioURYJhQIpu95QJ0pIKsRkK8fwB0puNiYusziWstp8-Y'

export const verifyJWT = (req, res, next) => {
	let token = req.headers['x-access-token']
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

	jwt.verify(token, SECRET, function(err, decoded) {
		if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })

		req.userId = decoded.id
		next()
	})
}

export const gerarToken = (id) => {
	let token = jwt.sign({id}, SECRET, {
		expiresIn: 60 * 60 * 24 // 24 horas
	})
	return token
}

export const gerarTokenAtualizarNoEReenviar = (no, refreshTokens, res) => {
	let token = gerarToken(no.id) 
	let refreshToken = randtoken.uid(256)
	no.token = token
	no.refreshToken = refreshToken
	No.findByIdAndUpdate(no.id, {$set: no}, (err, no) => {
		objetoDeRetorno.result.auth = false
		if(err){
			objetoDeRetorno.status = 'error'
			objetoDeRetorno.code = 6 
			objetoDeRetorno.message = 'Error on update no: ' . err
			return res.send(objetoDeRetorno)
		}

		no.token = token
		no.refreshToken = refreshToken
		no.password = null
		refreshTokens[refreshToken] = no.email
		objetoDeRetorno.status = 'ok'
		objetoDeRetorno.code = 200
		objetoDeRetorno.result.auth = true
		objetoDeRetorno.result.no = no
		return res.send(objetoDeRetorno)
	})
}

export const enviarEmail = (email, res) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'servidor@wavez.com.br',
			pass: 'servidor@wavez'
		}
	})

	let mailOptions = {
		from: 'falecomleonardopereira@gmail.com',
		to: email,
		subject: 'Lista de Ouro | Redefinir Senha',
		text: 'Prezado usuário, foi solicitada a redefinição da sua senha. Acesse o link abaixo para criar uma nova senha.'
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
			objetoDeRetorno.status = 'ok'
			objetoDeRetorno.code = 200
			return res.send(objetoDeRetorno)
		}
	})
}
