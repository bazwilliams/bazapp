define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/scores-template.html'
], function($, Backbone, Handlebars, ScoresTemplate){
    var ScoresView = Backbone.View.extend({
        template: Handlebars.compile(ScoresTemplate),

        initialize: function () {
            this.render();
        },

        render: function () {
            var templateResult = this.template(this.collection.toJSON());
            $(this.el).append(templateResult);
            $(this.el).find('#totalscore').text(this.collection.getScore());
            return this;
        }
    });

    return ScoresView;
	
});