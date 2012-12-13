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
            var score;
            score = this.get('success') - this.get('failure');
            this.set('score',score);
            return this.get('score');
        }
    });
    
    return FlashcardModel;
});