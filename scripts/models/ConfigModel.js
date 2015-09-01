define([
  'backbone'
], function(Backbone){
    return Backbone.Model.extend({
        defaults: {
            gameLength: 20,
            characterSet: 'p1',
            audio: true
        }
    });
});