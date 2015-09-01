define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/configure-template.html'
], function($, Backbone, Handlebars, ConfigureTemplate){
    return Backbone.View.extend({
        template: Handlebars.compile(ConfigureTemplate),
        events: {
            'change #keyboardselector' : 'changeKeyboardTheme',
            'click #startgame' : 'startGame'
        },
        changeKeyboardTheme: function() {
             $('#keyboardstylesheet').attr('href',this.$el.find('#keyboardselector').val());
        },
        startGame: function() {
            this.model.set('characterSet', this.$el.find('#characterselector').val());
            this.model.set('audio', this.$el.find('#gameaudiocheckbox').attr('checked') === 'checked');
            this.model.set('gameLength', this.$el.find('#gamelengthslider').val());
            this.options.router.navigate(this.model.get('characterSet') + '/' + this.model.get('gameLength'), {trigger: true});
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.append(this.template(this.model.toJSON()));
            this.$el.find('#characterselector').val(this.model.get('characterSet'));
            this.$el.find('#keyboardselector').val($('#keyboardstylesheet').attr('href'));
            if (this.model.get('audio')) {
                this.$el.find('#gameaudiocheckbox').attr('checked', 'checked');
            } else {
                this.$el.find('#gameaudiocheckbox').removeAttr('checked');
            }
            this.$el.find('#gamelengthslider').val(this.model.get('gameLength'));
            return this;
        }
    });
});