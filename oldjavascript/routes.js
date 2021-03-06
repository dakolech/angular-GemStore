var Product = require('./models/product');
var fs = require('fs');
var im = require('imagemagick'); 
var easyimg = require('easyimage'); 
im.identify.path = './identify.exe';
im.convert.path = './convert.exe';


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
		console.log(req.body.id);
		
		switch(req.body.what) {		
		case 'create':
			// create a product, information comes from AJAX request from Angular
			console.log('Product created: '+req.body.name+', '+req.body.price+' id: '+req.body.id);
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
			break;
			
		case 'edit':
			console.log(req.body.editing);
			Product.update({
				_id : req.body.id
				}, {
				editing : req.body.editing
			}, { multi: false }, function(err, product) {
				if (err)
					res.send(err);
					
				Product.find(function(err, products) {
					if (err)
						res.send(err)
					res.json(products);
				});

			});
			break;	
		
		case 'addReview':
			console.log('Review: '+req.body.stars+' stars, '+req.body.body+ ', by '+req.body.author+' added to: '+req.body.id);
			Product.findByIdAndUpdate(
				req.body.id,
				{$push: {reviews: {stars: req.body.stars, body: req.body.body, author: req.body.author}}},
				{safe: true, upsert: true}, function(err, product) {
				if (err)
					res.send(err);
					
				Product.find(function(err, products) {
					if (err)
						res.send(err)
					res.json(products);
				});

			});
			break;

		case 'deleteImage':			
			Product.findByIdAndUpdate(
				req.body.id,
				{$pull: {images: req.body.name}},
				{safe: true, upsert: true}, function(err, product) {
				if (err)
					res.send(err);
					
				Product.find(function(err, products) {
					if (err)
						res.send(err)
					res.json(products);
				});

			});
			
			fs.unlink('./public/images/' + req.body.name, function (err) {
				if (err) throw err;
					console.log('successfully deleted images/'+req.body.name);
			});
			fs.unlink('./public/images/thumbs/' + req.body.name, function (err) {
				if (err) throw err;
					console.log('successfully deleted images/thumbs/'+req.body.name);
			});
			fs.unlink('./public/images/gallerySize/' + req.body.name, function (err) {
				if (err) throw err;
					console.log('successfully deleted images/gallerySize/'+req.body.name);
			});
			
			console.log('Delete image: '+req.body.name+' from: '+req.body.id);
			break;
			
		}
	});
	
	app.post('/api/images/', function(req, res) {
		console.log("Added image ("+req.files.file.name+") to "+req.body.id);
		
		fs.readFile(req.files.file.path, function (err, data) {

			var imageName = req.files.file.name;

			/// If there's an error
			if(!imageName){

				console.log("There was an error")
				Product.find(function(err, products) {
					if (err)
						res.send(err)
					res.json(products);
				});

			} else {

			  var newPath = './public/images/' + imageName;
			  var thumbPath = './public/images/thumbs/' + imageName;
			  var galleryPath = './public/images/gallerySize/' + imageName;

			  // write file to images folder
			  fs.writeFile(newPath, data, function (err) {
			  //console.log(newPath,thumbPath);
			  
				im.resize({
				  srcPath: newPath,
				  dstPath: thumbPath,
				  height:   100 
				}, function(err, stdout, stderr){
				  if (err) throw err
				  console.log('resized image to fit within 200x200px');
				});
				
				im.resize({
				  srcPath: newPath,
				  dstPath: galleryPath,
				  height:   400 
				}, function(err, stdout, stderr){
				  if (err) throw err
				  console.log('resized image to fit within 500x500px');
				});
				
				// let's see it
				//res.redirect("/images/" + imageName);

			  });
			}
		});
		
		Product.findByIdAndUpdate(
			req.body.id,
			{$push: {images: req.files.file.name}},
			{safe: true, upsert: true}, function(err, product) {
			if (err)
				res.send(err);
				
			Product.find(function(err, products) {
				if (err)
					res.send(err)
				res.json(products);
			});

		});
	
	});
	
	app.get('/images/:file', function (req, res){
		file = req.params.file;
		var img = fs.readFileSync("./images/" + file);
		res.writeHead(200, {'Content-Type': 'image/jpg' });
		res.end(img, 'binary');

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