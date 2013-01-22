define([
  'jquery',
  'backbone',
  'models/FlashcardModel',
  'dictionary'
], function($, Backbone, FlashcardModel, dictionary){
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

        getCharacter: function(c) {
            //Tweak pronounciations :^)
            if (c === 'Z') {
                return 'zed';
            } else if (c === 'I') {
                return 'eye';
            } else if (c === 'E') {
                return 'eee';
            } else {
                return c;
            }
        },

        getExamplePhrase: function(style, c) {
            var word = dictionary(c);

            if (style !== 'number') {
                return this.getCharacter(c) + ' is for ' + word + '!';
            }
        },

        getSpokenPhrase: function(style, c) {
            var phraseprefix, character;

            if (style === 'number') {
                phraseprefix = 'Number';
            } else {
                phraseprefix = 'Letter, ';
            }

            return phraseprefix + ' ' + this.getCharacter(c) + '. ';
        },

        addCards: function(letters, style, speech) {
            var self, phrase, example;
            self = this;
            letters.split('').forEach( function (c) {
                var model = new FlashcardModel({
                    type: style,
                    character: c,
                    id: c
                });
                if (speech) {
                    phrase = self.getSpokenPhrase(style, c);
                    example = self.getExamplePhrase(style,c);
                    model.set('phrase', phrase + '. ' + (example?example:''));
                }
                self.add(model);
            });
        }
    });

	return FlashcardCollection;
});