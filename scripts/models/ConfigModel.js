define([
  'backbone'
], function(Backbone){
    var ConfigModel = Backbone.Model.extend({
        defaults: {
            gameLength: 20,
            characterSet: 'all'
        }
    });
    
    return ConfigModel;
});