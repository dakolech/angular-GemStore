(function(){

	var app = angular.module('store', ['store-products']);

	app.controller('StoreController', function($scope, $http){
		$scope.formData = {};
		$scope.formReview = {};
		
		$http.get('/api/products')
			.success(function(data) {
				$scope.products = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
		});
		
		$scope.createProduct = function() {
			$scope.formData.what = 'create';
			$http.post('/api/products', $scope.formData)
				.success(function(data) {
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.products = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};
		
		$scope.deleteProduct = function(id) {
			if (confirm("Are you sure to delete this product?")){
				$http.delete('/api/products/' + id)
					.success(function(data) {
						$scope.products = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			}
		};
		
		$scope.startEditProduct = function(id) {
			$scope.formData.editing = true;
			$scope.formData.what = 'edit';
			$scope.formData.id = id;
			$http.post('/api/products/', $scope.formData)
				.success(function(data) {
					$scope.products = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};
		
		$scope.stopEditProduct = function(id) {
			$scope.formData.editing = false;
			$scope.formData.what = 'edit';
			$scope.formData.id = id;		
			$http.post('/api/products/', $scope.formData)
				.success(function(data) {
					$scope.products = data;
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};
		
		$scope.addReview = function(product) {
			$scope.formReview.id = product._id;	
			$scope.formReview.what = 'addReview';
			var localReview=$scope.formReview;
			console.log(localReview);
			$http.post('/api/products/', $scope.formReview)
				.success(function(data) {
					//$scope.products = data;
					product.reviews.push(localReview);
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
			
			$scope.formReview = {};
		};
		
		
	});
	
	app.controller("PanelController", function($scope, $http){
		$scope.tab = 1;
		
		$scope.selectTab = function(setTab) {
			$scope.tab = setTab;
		};
		
		$scope.isSelected = function(checkTab){
			return $scope.tab === checkTab;
		};
	});
	/*
	app.controller('GalleryController', function(){
		this.current = 0;
		
		this.setCurrent = function(imageNumber){
		  this.current = imageNumber || 0;
		};
	});*/
	
	

	
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

