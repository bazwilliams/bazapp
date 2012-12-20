define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/rocket-template.html'
], function($, Backbone, Handlebars, RocketTemplate){
    var RocketView = Backbone.View.extend({
        template: Handlebars.compile(RocketTemplate),

        rocketSpeed: 10,
        
        initialize: function() {
            this.rocketSpeed = 260 / this.options.gameSpeed;
            this.collection.bind('change', this.updateScore, this);
            this.collection.bind('attempt', this.changeFlame, this);
            this.collection.bind('success', this.moveUp, this);
            this.render();
        },

        onClose: function () {
            this.collection.unbind('change', this.updateScore);
            this.collection.unbind('attempt', this.changeFlame);
            this.collection.unbind('success', this.moveUp);
        },

        moveUp: function () {
            var height;

            $('#rocket').animate({
                top: '-='+this.rocketSpeed
            }, {
                duration: 100
            });

            height = parseInt($('#rocket').css('top'),10);
            if (height <= 0) this.collection.trigger('complete');
        },

        changeFlame: function () {

            $('#rocket').removeClass('attempt-0')
                        .removeClass('attempt-1')
                        .removeClass('attempt-2')
                        .removeClass('attempt-3')
                        .addClass('attempt-'+this.collection.attempt);
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
