require([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/scores-template.html'
], function($, Backbone, Handlebars, ScoresTemplate){
    var ScoresView = Backbone.View.extend({
        template: Handlebars.compile(ScoresTemplate),

        initialize: function() {
            this.collection.bind('change', this.render, this);
            this.render();
        },

        render: function() {
            var templateResult = this.template({
                score : this.collection.getScore(),
                attempt : this.collection.attempt
            });
            $(this.el).empty();
            $(this.el).append(templateResult);
            return this;
        }
    })

    return ScoresView;
});