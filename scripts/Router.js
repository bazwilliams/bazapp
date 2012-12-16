define([
  'backbone'
], function(Backbone){
	var Router = Backbone.Router.extend({
        routes: {
            'letters/:number' : 'letters',
            'numbers/:number' : 'numbers',
            'all/:number'  : 'all',
            '' : 'configure'
        }
    });

    return Router;
});