define([
  'handlebars'
], function(Handlebars){

	Handlebars.registerHelper('add', function(a,b) {
	  return a + b;
	});

	/* https://github.com/danharper/Handlebars-Helpers/blob/master/helpers.js */
	Handlebars.registerHelper('if_gt', function(context, options) {
		if (context > options.hash.compare)
			return options.fn(this);
		return options.inverse(this);
	});

});