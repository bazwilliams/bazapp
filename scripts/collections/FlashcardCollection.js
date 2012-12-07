define([
  'jquery',
  'backbone',
  'models/FlashcardModel'
], function($, Backbone, FlashcardModel){
    var FlashcardCollection = Backbone.Collection.extend({
        model: FlashcardModel,

        attempt : 0,

        increaseAttempt : function(announce) {
            this.attempt += 1;
            if (announce) {
                this.trigger('attempt');
            }
        },

        resetAttempt : function(announce) {
            this.attempt = 0;
            if (announce) {
                this.trigger('attempt');
            }
        },

        getScore : function() {
            var score = 0;
            this.each(function(model) {
                score += model.getScore();
            });
            return score;
        },

        comparator : function(modelA, modelB) {
            var a,b;
            if (modelA && modelB) {
                a = modelA.getScore();
                b = modelB.getScore();
                if ( a < b ) {
                    return -1;
                }
                if ( a > b ) {
                    return 1;
                }
            }
            return 0;
        },

        getNextCard: function() {
            var nextId;
            nextId=Math.floor(Math.pow(Math.random(),1.5)*this.length);
            return this.at(nextId);
        },

        addCards: function(letters, style) {
            var self = this;
            letters.split('').forEach( function (c) {
                var model = new FlashcardModel({
                    type: style,
                    character: c,
                    id: c
                });
                self.add(model);
            });
        }
    });

	return FlashcardCollection;
});