define([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/key-template.html'
], function($, Backbone, Handlebars, KeyTemplate){
    return Backbone.View.extend({
        template: Handlebars.compile(KeyTemplate),

        events: {
            'click #key' : 'play'
        },

        initialize: function () {
            this.listenTo(this.model, 'failure', this.retry);
            this.render();
            this.play();
        },

        render: function () {
            var templateResult = this.template(this.model.toJSON());
            $(this.el).append(templateResult);
            return this;
        },

        retry: function() {
            if (this.model.get('retry')) {
                this.$el.find('#retry').get(0).play();
            }
        },

        play: function() {
            if (this.model.get('phrase')) {
                this.$el.find('#phrase').get(0).play();
            }
            if (this.model.get('example')) {
                this.$el.find('#example').get(0).play();
            }
        }
    });
});
