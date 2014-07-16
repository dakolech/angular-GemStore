(function(){
	var app = angular.module('store-products', [ ]);
	
	app.directive('productTitle', function(){
		return {
			restrict: 'A', 
			templateUrl: './templates/product-title.html'
		};
	});

	app.directive('productPanels', function(){
		return {
			restrict: 'A',
			templateUrl: './templates/product-panels.html',
			controller: function() {
				this.tab = 1;
		
				this.selectTab = function(setTab) {
					this.tab = setTab;
				};
		
				this.isSelected = function(checkTab){
					return this.tab === checkTab;
				};
			},
			controllerAs: 'panels'
		};
	});

	app.directive("productGallery", function() {
		return {
			restrict: "A",
			templateUrl: "./templates/product-gallery.html",
			controller: function() {
				this.current = 0;
				this.setCurrent = function(imageNumber){
					this.current = imageNumber || 0;
			 };
		  },
		  controllerAs: "gallery"
		};
	});
})();