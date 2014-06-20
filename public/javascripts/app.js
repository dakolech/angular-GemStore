(function(){

	var app = angular.module('store', ['store-products']);

	app.controller('StoreController', ['$http', function($http) {	
		var store = this;
		
		store.products = [ ];
		
		$http.get('/products.json').success(function(data){
			store.products = data;
			console.log("JSON load success.");
		});
	}]);
	
	app.controller("PanelController", function(){
		this.tab = 1;
		
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};
	});
	
	app.controller('GalleryController', function(){
		this.current = 0;
		
		this.setCurrent = function(imageNumber){
		  this.current = imageNumber || 0;
		};
	});
	
	app.controller("ReviewController", function(){
		this.review = {};
		
		this.addReview = function(product) {
			product.reviews.push(this.review);
			this.review = {};
		};
	});
	
	
})();

