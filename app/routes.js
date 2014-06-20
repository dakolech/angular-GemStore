var Product = require('./models/product');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all products
	app.get('/api/products', function(req, res) {

		// use mongoose to get all products in the database
		Product.find(function(err, products) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(products); // return all products in JSON format
		});
	});

	// create product and send back all products after creation
	app.post('/api/products', function(req, res) {

		// create a product, information comes from AJAX request from Angular
		Product.create({
			name : req.body.name,
			price : req.body.price,
			description : req.body.description,
			canPurchase : req.body.canPurchase
		}, function(err, product) {
			if (err)
				res.send(err);

			// get and return all the products after you create another
			Product.find(function(err, products) {
				if (err)
					res.send(err)
				res.json(products);
			});
		});

	});

	// delete a product
	app.delete('/api/products/:product_id', function(req, res) {
		Product.remove({
			_id : req.params.product_id
		}, function(err, product) {
			if (err)
				res.send(err);

			// get and return all the products after you create another
			Product.find(function(err, products) {
				if (err)
					res.send(err)
				res.json(products);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};