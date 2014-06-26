var mongoose = require('mongoose');

module.exports = mongoose.model('Product', {
	name 		: String,
	price 		: Number,
	added		: { type: Date, default: Date.now },
	description	: String,
	canPurchase	: Boolean,
	editing		: Boolean,
	reviews		: [{
					stars 	: Number,
					body 	: String,
					author 	: String
				  }]
});