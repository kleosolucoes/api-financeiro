// app.js

import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import indexRoute from './routes/index.route'
//import noRoute from './routes/no.route'
//import leadRoute from './routes/lead.route'
//import eventRoute from './routes/event.route'
//import pagseguroRoute from './routes/pagseguro.route'
//import pushRoute from './routes/push.route'
//import notificationRoute from './routes/notification.route'
//import { verifyJWT } from './constants'
import mongoose from 'mongoose'

//const cors = require('cors')

const app = express()
const dev_db_url = 'mongodb://financeiro:QokmeXrmTNHYzey2@ds047950.mlab.com:47950/api-financeiro'
//let dev_db_url = 'mongodb://localhost:27017/listadeouro'
let mongoDB = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongoDB, { useNewUrlParser: true})
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//const corsOptions = {
//  origin: ['http://localhost:8100', 'http://localhost:8080']
//}

//app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
//app.set('view engine', 'ejs')
app.use('/', indexRoute)
//app.use('/no', noRoute)
//app.use('/lead', verifyJWT, leadRoute)
//app.use('/event', verifyJWT, eventRoute)
//app.use('/pagseguro', verifyJWT, pagseguroRoute)
//app.use('/push', pushRoute)
//app.use('/notification', notificationRoute)

//app.options('*', cors())

const port = normalizaPort(process.env.PORT || '8080')

function normalizaPort(val) {
	const port = parseInt(val, 10)
	if (isNaN(port)) {
		return val
	}
	if (port >= 0) {
		return port
	}
	return false
}

app.listen(port, () => {
	console.log('Server is up and running on port number ' + port);
})
