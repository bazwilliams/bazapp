define([
    'jquery',
    'jquery-ui',
    'backbone',
    'handlebars',
    'text!templates/configure-template.html'
], function($, jqueryui, Backbone, Handlebars, ConfigureTemplate){
    var ConfigureView = Backbone.View.extend({

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
            this.model.set('characterSet', this.$el.find('#characterselector').val());
        },

        startGame: function() {
            this.options.router.navigate(this.model.get('characterSet') + '/' + this.model.get('gameLength'), {trigger: true});
        },

        initialize: function () {
            this.render();
        },

        updateGameLength: function () {
            this.model.set('gameLength',this.$el.find('#gamelengthslider').slider("value"));
            this.$el.find('#gamelength').text(this.model.get('gameLength'));
        },

        render: function () {
            var templateResult, self;
            templateResult = this.template();
            this.$el.append(templateResult);
            this.$el.find('#characterselector').val(this.model.get('characterSet'));
            this.$el.find('#keyboardselector').val($('#keyboardstylesheet').attr('href'));
            self = this;
            this.$el.find('#gamelengthslider').slider({
                value: this.model.get('gameLength'),
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