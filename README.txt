Start server:
	nodemon server.js

CoffeeScript:
	coffee -o public/javascripts/ -cw public/source/
	coffee -o app/ -cw app/source/
	coffee --watch --compile server.coffee
Jade:
	jade -o public/views/ -wP public/source/
