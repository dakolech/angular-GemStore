app = angular.module('store-products', [ ])

app.directive 'productTitle', ->
	restrict: 'A'
	templateUrl: './templates/product-title.html'
	
app.directive 'productPanels',  ->
	restrict: 'A'
	templateUrl: './templates/product-panels.html'
	controller: ->
		this.tab = 1

		this.selectTab = (setTab) ->
			this.tab = setTab

		this.isSelected = (checkTab) ->
			this.tab == checkTab
	controllerAs: 'panels'
	 
app.directive "productGallery", ->
	restrict: "A"
	templateUrl: "./templates/product-gallery.html"
	controller:  ->
		this.current = 0;
		this.setCurrent = (imageNumber) ->
			this.current = imageNumber || 0
			return
		return
	controllerAs: "gallery"

	

