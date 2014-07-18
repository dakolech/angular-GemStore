// Generated by CoffeeScript 1.7.1
(function() {
  'use strict';
  angular.module('myApp.directives', []).directive('productTitle', function() {
    return {
      restrict: 'A',
      templateUrl: './templates/product-title.html'
    };
  }).directive('productPanels', function() {
    return {
      restrict: 'A',
      templateUrl: './templates/product-panels.html',
      controller: function() {
        this.tab = 1;
        this.selectTab = function(setTab) {
          return this.tab = setTab;
        };
        return this.isSelected = function(checkTab) {
          return this.tab === checkTab;
        };
      },
      controllerAs: 'panels'
    };
  }).directive("productGallery", function() {
    return {
      restrict: "A",
      templateUrl: "./templates/product-gallery.html",
      controller: function() {
        this.current = 0;
        this.setCurrent = function(imageNumber) {
          this.current = imageNumber || 0;
        };
      },
      controllerAs: "gallery"
    };
  });

}).call(this);