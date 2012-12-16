define([
    'jquery',
    'jquery-ui',
    'backbone',
    'handlebars',
    'text!templates/configure-template.html'
], function($, jqueryui, Backbone, Handlebars, ConfigureTemplate){
    var ConfigureView = Backbone.View.extend({

        characterSet: 'all',

        gameLength: 20,

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
            this.options.router.navigate(this.characterSet + '/' + this.gameLength, {trigger: true});
        },

        initialize: function () {
            this.render();
        },

        updateGameLength: function () {
            this.gameLength = this.$el.find('#gamelengthslider').slider("value");
            this.$el.find('#gamelength').text(this.gameLength);
        },

        render: function () {
            var templateResult, self;
            templateResult = this.template();
            this.$el.append(templateResult);
            this.$el.find('#keyboardselector').val($('#keyboardstylesheet').attr('href'));
            self = this;
            this.$el.find('#gamelengthslider').slider({
                value: this.gameLength,
                min: 1,
                max: 100,
                step: 1,
                slide: function( event, ui ) {
                    self.updateGameLength();
                }
            });
            this.updateGameLength();
            return this;
        }
    });

    return ConfigureView;
	
});