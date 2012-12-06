require([
    'jquery',
    'backbone',
    'handlebars',
    'text!templates/key-template.html'
], function($, Backbone, Handlebars, KeyTemplate){
    var FlashcardView = Backbone.View.extend({
        template: Handlebars.compile(KeyTemplate),

        initialize: function () {
            this.render();
        },

        render: function () {
            var templateResult = this.template(this.model.toJSON());
            $(this.el).append(templateResult);
            return this;
        }
    });

    return FlashcardView;
	
});