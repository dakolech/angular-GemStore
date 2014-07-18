# server.js

# set up ========================
express  = require('express')
app      = express() 							# create our app w/ express
mongoose = require('mongoose') 					# mongoose for mongodb


# configuration =================

#mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu') 	# connect to mongoDB database on modulus.io
mongoose.connect('mongodb://dakolech:dako222@novus.modulusmongo.net:27017/po5Vymyq') 

app.configure ->
	app.use(express.static(__dirname + '/public')) 		# set the static files location /public/img will be /img for users
	app.use(express.logger('dev')) 						# log every request to the console
	app.use(express.bodyParser())						# pull information from html in POST
	app.use(express.methodOverride()) 					# simulate DELETE and PUT
	app.set('views', __dirname + '/public/views')
	app.set('view engine', 'jade')
	app.engine('html', require('ejs').renderFile)
	return


# routes ======================================================================
require('./app/routes.js')(app)

# listen (start app with node server.js) ======================================
app.listen(8080)
console.log("App listening on port 8080")
