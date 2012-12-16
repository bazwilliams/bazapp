require.config({
    paths: {
        jquery: 'jquery-1.8.2.min',
        'jquery-color': 'jquery.color',
        'jquery-ui': 'jquery-ui-1.9.2.custom.min',
        underscore: 'underscore-min',
        handlebars: 'handlebars-1.0.rc.1',
        backbone: 'backbone-min'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});

require(['app'], function(App) {
	App.initialize();
});