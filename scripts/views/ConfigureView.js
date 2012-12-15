define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/configure-template.html'
], function($, Backbone, Handlebars, ConfigureTemplate){
    var ConfigureView = Backbone.View.extend({

        characterSet: 'all',

        template: Handlebars.compile(ConfigureTemplate),

        events: {
            'change #keyboardselector' : 'changeKeyboardTheme',
            'change #characterselector' : 'setCharacterSet',
            'click #startgame' : 'startGame'
        },

        changeKeyboardTheme: function() {
             $('#keyboardstylesheet').attr('href',this.$el.find('#keyboardselector').val());
        },

        setCharacterSet: function() {
            this.characterSet = this.$el.find('#characterselector').val();
        },

        startGame: function() {
            this.options.router.navigate(this.characterSet, {trigger: true});
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            var templateResult = this.template();
            this.$el.append(templateResult);
            return this;
        }
    });

    return ConfigureView;
	
});