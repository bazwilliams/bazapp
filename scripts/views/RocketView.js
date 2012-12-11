define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/rocket-template.html'
], function($, Backbone, Handlebars, RocketTemplate){
    var RocketView = Backbone.View.extend({
        template: Handlebars.compile(RocketTemplate),

        initialize: function() {
            this.collection.bind('change', this.updateScore, this);
            this.collection.bind('attempt', this.changeFlame, this);
            this.collection.bind('success', this.moveUp, this);
            this.render();
        },

        moveUp: function () {
            $('#rocket').animate({
                top: '-=20'
            }, {
                duration: 100
            });
        },

        images: [ 'url(images/rocket-full.png)', 
                  'url(images/rocket-medium.png)', 
                  'url(images/rocket-low.png)' ],

        changeFlame: function () {
            $('#rocket').animate({
                'background-image': this.images[this.collection.attempt]
            }, {
                duration: 50
            });
            $('#rocket').css('background-image',this.images[this.collection.attempt]);
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

    return RocketView;
});