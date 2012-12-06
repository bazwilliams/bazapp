require.config({
	paths: {
		jquery: 'jquery-1.8.2.min',
		underscore: 'underscore-min',
		handlebars: 'handlebars-1.0.rc.1',
		backbone: 'backbone-min'
	},

	shim: {
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

require([
	'app',
], function(App){
	App.initialize();
});