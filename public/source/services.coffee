'use strict';

# Services *


# Demonstrate how to register services
# In this case it is a simple value service.
<<<<<<< HEAD
angular.module('myApp.services', [])

.value('version', '0.1')

.factory('ProductService', [ '$resource', ($resource) ->
    return $resource('/products/:id', {
        id : '@_id'
        });
 ]);
=======
angular.module('myApp.services', []).
  value('version', '0.1');
>>>>>>> parent of df52395... working with routes
