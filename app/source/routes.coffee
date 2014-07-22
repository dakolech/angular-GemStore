Product = require('./models/product')
fs = require('fs')
im = require('imagemagick')
easyimg = require('easyimage') 
im.identify.path = './identify.exe'
im.convert.path = './convert.exe'


module.exports = (app) ->

	# api --------------------------------------------------------------------- 
	# get all products
	app.get '/api/products', (req, res) ->

		# use mongoose to get all products in the database
		Product.find (err, products) ->

			# if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(products); # return all products in JSON format
			return
		return
		
		
	app.get '/api/products/:product_id', (req, res) ->
		Product.findById req.params.product_id,  (err, product) ->
			res.send(err) if (err)    
			res.json(product); 
			return
		return
		
	#app.get '/admin', (req, res) ->
	#	res.render('admin.html')
	#	return
		
	#app.get '/', (req, res) ->
	#	res.render('index.html')
	#	return	
		
		
	#app.get '/product', (req, res) ->
	#	res.render('views/product.html')
	#	return
		
		
	#app.get '/products/:product_id', (req, res) ->
	#	Product.findById req.params.product_id,  (err, product) ->
	#		res.send(err) if (err)
	#		res.render('product.html', { name: product.name } )     
	#		return      
	#	return

		
	app.post '/api/products', (req, res) ->
		console.log(req.body.id)
		
		switch req.body.what 		
			when 'create' 
				# create a product, information comes from AJAX request from Angular
				console.log('Product created: '+req.body.name+', '+req.body.price+' id: '+req.body.id)
				Product.create {
					name : req.body.name,
					price : req.body.price,
					description : req.body.description,
					canPurchase : req.body.canPurchase
				}, (err, product) ->
					if (err)
						res.send(err);

					# get and return all the products after you create another
					Product.find (err, products) ->
						if (err)
							res.send(err)
						res.json(products);
						return
					return
				return
			
			when 'edit'
				console.log(req.body.editing)
				Product.update {
					_id : req.body.id
					}, {
					editing : req.body.editing
				}, { multi: false }, (err, product) ->
					if (err)
						res.send(err);
						
					Product.find (err, products) ->
						if (err)
							res.send(err)
						res.json(products);
						return
					return
				return	
			
			when 'addReview'
				console.log('Review: '+req.body.stars+' stars, '+req.body.body+ ', by '+req.body.author+' added to: '+req.body.id);
				Product.findByIdAndUpdate req.body.id,
					{$push: {reviews: {stars: req.body.stars, body: req.body.body, author: req.body.author}}},
					{safe: true, upsert: true}, (err, product) ->
						if (err)
							res.send(err);
							
						Product.find (err, products) ->
							if (err)
								res.send(err)
							res.json(products);
							return
						return
					
				return

			when 'deleteImage'		
				Product.findByIdAndUpdate req.body.id,
					{$pull: {images: req.body.name}},
					{safe: true, upsert: true}, (err, product) ->
						if (err)
							res.send(err);
							
						Product.find (err, products) ->
							if (err)
								res.send(err)
							res.json(products);
							return
						return

				
				fs.unlink './public/images/' + req.body.name, (err) ->
					throw err if err
					console.log('successfully deleted images/'+req.body.name)
					return

				fs.unlink './public/images/thumbs/' + req.body.name, (err) ->
					throw err if err
					console.log('successfully deleted images/thumbs/'+req.body.name)
					return

				fs.unlink './public/images/gallerySize/' + req.body.name, (err) ->
					throw err if err
					console.log('successfully deleted images/gallerySize/'+req.body.name)
					return
				
				console.log('Delete image: '+req.body.name+' from: '+req.body.id);
				return
				
				
				
	app.post '/api/images/', (req, res) ->
		console.log("Added image ("+req.files.file.name+") to "+req.body.id)
		
		fs.readFile req.files.file.path, (err, data) ->

			imageName = req.files.file.name

			# If there's an error
			if !imageName
				console.log("There was an error")
				Product.find (err, products) ->
					res.send(err) if (err)						
					res.json(products);
					return

			else 

				newPath = './public/images/' + imageName
				thumbPath = './public/images/thumbs/' + imageName
				galleryPath = './public/images/gallerySize/' + imageName

				# write file to images folder
				fs.writeFile newPath, data, (err) ->
				#console.log(newPath,thumbPath);			  
					im.resize {
					  srcPath: newPath,
					  dstPath: thumbPath,
					  height:   100 
					}, (err, stdout, stderr) ->
					  throw err if (err)
					  console.log('resized image to fit within 200x200px');
					  return

					im.resize {
					  srcPath: newPath,
					  dstPath: galleryPath,
					  height:   400 
					}, (err, stdout, stderr) ->
					  throw err if (err)
					  console.log('resized image to fit within 500x500px');
					  return

					return

				# let's see it
				#res.redirect("/images/" + imageName);
			return

		
		Product.findByIdAndUpdate req.body.id,
			{$push: {images: req.files.file.name}},
			{safe: true, upsert: true}, (err, product) ->
				res.send(err) if (err)
				
				
				Product.find (err, products) ->
					res.send(err) if (err)						
					res.json(products)
					return
				return

		return

	
	app.get '/images/:file', (req, res) ->
		file = req.params.file
		img = fs.readFileSync("./images/" + file)
		res.writeHead(200, {'Content-Type': 'image/jpg' })
		res.end(img, 'binary')
		return


	
	
	# delete a product
	app.delete '/api/products/:product_id', (req, res) ->
		Product.remove {
			_id : req.params.product_id
		}, (err, product) ->
			res.send(err) if (err)
				

			# get and return all the products after you create another
			Product.find (err, products) ->
				res.send(err) if (err)						
				res.json(products)
				return
			return
		return


	# application -------------------------------------------------------------
	app.get '*', (req, res) ->
		res.sendfile('./public/index.html') # load the single view file (angular will handle the page changes on the front-end)
		return

	
		
	return