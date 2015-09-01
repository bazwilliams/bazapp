define([
  'backbone'
], function(Backbone){
	return Backbone.Router.extend({
        routes: {
            'letters/:number' : 'letters',
            'numbers/:number' : 'numbers',
            'all/:number'  : 'all',
            'p1/:number' : 'p1',
            '' : 'configure'
        }
    });
});