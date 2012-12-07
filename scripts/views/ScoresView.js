define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/scores-template.html'
], function($, Backbone, Handlebars, ScoresTemplate){
    var ScoresView = Backbone.View.extend({
        template: Handlebars.compile(ScoresTemplate),

        initialize: function() {
            this.collection.bind('change', this.updateScore, this);
            this.collection.bind('attempt', this.changeFlame, this);
            this.collection.bind('success', this.moveUp, this);
            this.render();
        },

        moveUp: function () {
            $('#scores').animate({
                top: '-=20'
            }, {
                duration: 100
            });
        },

        images: [ 'url(images/rocket-full.png)', 
                  'url(images/rocket-medium.png)', 
                  'url(images/rocket-low.png)' ],

        changeFlame: function () {
            $('#scores').animate({
                'background-image': this.images[this.collection.attempt]
            }, {
                duration: 50
            });
            $('#scores').css('background-image',this.images[this.collection.attempt]);
        },

        updateScore: function() {
            $(this.el).find('span').text(this.collection.getScore());
        },

        render: function() {
            var templateResult = this.template({
                score : this.collection.getScore(),
                attempt : this.collection.attempt
            });
            $(this.el).append(templateResult);
            return this;
        }
    })

    return ScoresView;
});