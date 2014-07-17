'use strict';

# Directives 



angular.module('myApp.directives', [])
.directive 'productTitle', ->
	restrict: 'A'
	templateUrl: './templates/product-title.html'

.directive 'productPanels',  ->
	restrict: 'A'
	templateUrl: './templates/product-panels.html'
	controller: ->
		this.tab = 1

		this.selectTab = (setTab) ->
			this.tab = setTab

		this.isSelected = (checkTab) ->
			this.tab == checkTab
	controllerAs: 'panels'
	 
.directive "productGallery", ->
	restrict: "A"
	templateUrl: "./templates/product-gallery.html"
	controller:  ->
		this.current = 0;
		this.setCurrent = (imageNumber) ->
			this.current = imageNumber || 0
			return
		return
	controllerAs: "gallery"

	

