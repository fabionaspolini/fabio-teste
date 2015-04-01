// Model de beer

var mongoose = require('mongoose');

if (process.env.NODE_ENV == "production") {
	mongoose.connect('mongodb://mongo/workshop-criciuma');
} else {
	mongoose.connect('mongodb://localhost/workshop-criciuma');
}

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Erro de conexao.', err)
});
db.once('open', function () {
    console.log('Conexão aberta.')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    alcohol: { type: Number, min: 0 },
    price: { type: Number, min: 0 },
    category: { type: String, default: '' },
    created: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema);

module.exports = mongoose.model('Beer', BeerSchema);