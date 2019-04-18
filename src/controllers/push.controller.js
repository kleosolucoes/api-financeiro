import Push from '../models/push.model'
import { 
	objetoDeRetorno, 
	publicKey,
	privateKey,
} from '../constantes'
import webPush from 'web-push'


exports.inscrever = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	if(req.body.endpoint){
		const push = new Push(req.body)
		console.log(push)
		push.save((err, push) => {
			if (err) {
				console.error(`Error occurred while saving subscription. Err: ${err}`)
				objetoDeRetorno.menssagem = 'Technical error occurred'
				res.json(objetoDeRetorno)
			} else {
				objetoDeRetorno.ok = true
				objetoDeRetorno.resultado = {
					push,
					data: 'Subscription saved.'
				}
				res.json(objetoDeRetorno)
			}
		})
	}else{
		objetoDeRetorno.menssagem = 'Sem dados'
		res.json(objetoDeRetorno)
	}
}

exports.notificar = (req, res) => {
	objetoDeRetorno.ok = false 
	objetoDeRetorno.menssagem = ''
	objetoDeRetorno.resultado = {}

	const payload = {
		title: 'titulo',
		message: 'message',
	};

	Push.find({}, (err, pushes) => {
		if (err) {
			console.error(`Error occurred while getting subscriptions`);
			objetoDeRetorno.menssagem = 'Technical error occurred'
			res.json(objetoDeRetorno)
		} else {
			pushes.map(push => {
					const pushSubscription = {
						endpoint: push.endpoint,
						keys: {
							p256dh: push.keys.p256dh,
							auth: push.keys.auth
						}
					}
					const pushPayload = JSON.stringify(payload);
					webPush.setVapidDetails(
							'mailto:web-push-book@gauntface.com',
							publicKey,
							privateKey
					)
					webPush.sendNotification(
						pushSubscription,
						pushPayload
					)
					.then((value) => console.log('foi '))
					.catch((err) => console.log('err ', err))
			})
			objetoDeRetorno.ok = true
			objetoDeRetorno.resultado = {
				data: 'Notificando'
			}
			res.json(objetoDeRetorno)
		}
	});
}
