'use strict';

# Services *


# Demonstrate how to register services
# In this case it is a simple value service.
angular.module('myApp.services', [])

.factory('ProductService', [ '$resource', ($resource) ->
    return $resource('/products/:id', {
        id : '@_id'
        });
 ]);




