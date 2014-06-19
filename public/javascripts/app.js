(function(){

	var app = angular.module('store', [ ]);

	app.controller('StoreController', function(){
		this.products = gems;
	});
	
	app.controller("PanelController", function(){
		this.tab = 1;
		
		this.selectTab = function(setTab) {
			this.tab = setTab;
		};
		
		this.isSelected = function(checkTab){
			return this.tab === checkTab;
		};
	});
	
	app.controller("ReviewController", function(){
		this.review = {};
		
		this.addReview = function(product) {
			product.reviews.push(this.review);
			this.review = {};
		};
	});
	
	app.directive('productTitle', function(){
		return {
			restrict: 'A', 
			templateUrl: './templates/product-title.html'
		};
	});
	
	app.directive('productPanels', function(){
		return {
			restrict: 'E',
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
	
	var gems = [
		{
			name: "Dodecahedron",
			price: 2.95,
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vestibulum risus eget convallis aliquam. Nunc accumsan lorem eget risus aliquam, pharetra ultrices sem dapibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin cursus aliquam purus, a faucibus ligula fermentum eget. Phasellus quis convallis tortor. Quisque dictum nisi vel molestie rutrum. Vestibulum vitae mauris ut magna interdum ultricies. Donec et placerat purus. Donec ornare varius ligula eu sodales. Donec eget rhoncus magna, in pharetra dolor. Aenean id lacinia lorem, et hendrerit felis. Nunc volutpat lectus non purus ultrices lobortis. Ut ornare volutpat lorem quis placerat. Nunc vitae magna sed nibh tempus tempus.",
			canPurchase: true,
			images: [
				{
					full: 'Dodecahedron-01-full.png',
					thumb: 'Dodecahedron-01-thumb.png'
				},
				{
					full: 'Dodecahedron-02-full.png',
					thumb: 'Dodecahedron-02-thumb.png'
				},
				{
					full: 'Dodecahedron-03-full.png',
					thumb: 'Dodecahedron-03-thumb.png'
				}	
			],
			reviews: [
				{
					stars: 5,
					body: "I love this product!",
					author: "joe@thomas.com"
				},
				{
					stars: 1,
					body: "This product sucks",
					author: "tim@hater.com"
				}
				]
		},
		{
			name: "Pentagonal Gem",
			price: 5,
			description: "Nulla venenatis ante magna, ac scelerisque dui blandit vel. Integer luctus commodo nibh, at fermentum dui venenatis at. Etiam vitae massa vitae velit consequat rutrum. In ultrices eget arcu vitae laoreet. Vestibulum tristique, leo eu porttitor lobortis, sem mi tincidunt dolor, vulputate luctus eros est vel odio. Morbi fermentum nisl a purus facilisis tincidunt. Aliquam tempus convallis dui vel mattis. Quisque et nibh auctor, ultrices urna at, convallis magna. Suspendisse mattis luctus sagittis. Donec vel placerat dolor, eu lobortis nunc. Sed sapien justo, suscipit sed tincidunt id, iaculis id quam. Aenean pretium tempor aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
			canPurchase: false,
			images: [
				{
					full: 'PentagonalGem-01-full.png',
					thumb: 'PentagonalGem-01-thumb.png'
				},
				{
					full: 'PentagonalGem-02-full.png',
					thumb: 'PentagonalGem-02-thumb.png'
				},
				{
					full: 'PentagonalGem-03-full.png',
					thumb: 'PentagonalGem-03-thumb.png'
				}
			],
			reviews: [
				{
					stars: 4,
					body: "I love this product! :)",
					author: "asd@thomas.com"
				},
				{
					stars: 2,
					body: "This product sucks :/",
					author: "dsa@hater.com"
				}
				]				
		}
	];
	
})();

