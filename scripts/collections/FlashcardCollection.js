define([
  'jquery',
  'backbone',
  'models/FlashcardModel'
], function($, Backbone, FlashcardModel){
    var FlashcardCollection = Backbone.Collection.extend({
        model: FlashcardModel,

        initialize : function() {
            this.attempt = 0;
        },

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

        getSpokenPhrase: function(style, c) {
            var phraseprefix;
            if (style === 'number') {
                phraseprefix = 'Number';
            } else {
                phraseprefix = 'Letter, ';
            }

            //Tweak pronounciations :^)
            if (c === 'Z') {
                return phraseprefix + ' zed';
            } else if (c === 'I') {
                return phraseprefix + ' eye';
            } else {
                return phraseprefix + ' ' +c;
            } 
        },

        addCards: function(letters, style, speech) {
            var self = this;
            letters.split('').forEach( function (c) {
                var model = new FlashcardModel({
                    type: style,
                    character: c,
                    id: c
                });
                if (speech) {
                    model.set('phrase',self.getSpokenPhrase(style, c));
                }
                self.add(model);
            });
        }
    });

	return FlashcardCollection;
});