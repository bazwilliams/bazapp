define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/key-template.html'
], function($, Backbone, Handlebars, KeyTemplate){
    var FlashcardView = Backbone.View.extend({
        template: Handlebars.compile(KeyTemplate),

        events: {
            'click #key' : 'play'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            var templateResult = this.template(this.model.toJSON());
            $(this.el).append(templateResult);
            this.play();
            return this;
        },

        play: function() {
            if (this.model.get('phrase')) {
                this.$el.find('audio').get(0).play();
            }
        }
    });

    return FlashcardView;
	
});