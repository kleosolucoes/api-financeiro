const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
	endpoint: String,
	keys: Schema.Types.Mixed,
	data_criacao: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('push', schema)
