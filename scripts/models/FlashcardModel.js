define([
  'backbone'
], function(Backbone){
    var FlashcardModel = Backbone.Model.extend({
        defaults: {
            success: 0,
            failure: 0,
            type: '',
            character: ''
        },

        getScore: function() {
            return this.get('success') - this.get('failure');
        }
    });
    
    return FlashcardModel;
});