define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/scores-template.html',
    'jquery.color'
], function($, Backbone, Handlebars, ScoresTemplate){
    var ScoresView = Backbone.View.extend({
        template: Handlebars.compile(ScoresTemplate),

        events: {
            'click #startgame' : 'startGame'
        },

        initialize: function () {
            this.render();
        },

        startGame: function() {
            this.options.router.navigate('', {trigger: true});
        },

        render: function () {
            var templateResult = this.template(this.collection.toJSON());
            $(this.el).append(templateResult);
            $(this.el).find('#totalscore').text(this.collection.getScore());
            
            $('article').animate({
                'backgroundColor': '#111111'
            }, {
                duration: 500
            });

            return this;
        }
    });

    return ScoresView;
	
});