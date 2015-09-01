define([
  'jquery',
  'backbone',
  'models/FlashcardModel',
  'dictionary'
], function($, Backbone, FlashcardModel, dictionary){
    return Backbone.Collection.extend({
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
            //phonetics :^)
            switch (c) {
                case 'S':
                    return 'issssssssssss';
                case 'T':
                    return 'Tuh';
                case 'N':
                    return 'Nur';
                case 'I':
                    return 'Ih';
                case 'A':
                    return 'Aah';
                case 'P':
                    return 'Pur';
                default:
                    return c;
            }
        },

        getRetryPhrase: function(style, c) {
            return "Try again! " + this.getSpokenPhrase(style, c);
        },

        getExamplePhrase: function(style, c) {
            var word = dictionary(c);

            if (style !== 'number') {
                return this.getCharacter(c) + ' is for ' + word + '!';
            }
            return undefined;
        },

        getSpokenPhrase: function(style, c) {
            return this.getCharacter(c) + '. ';
        },

        addCards: function(letters, style, speech) {
            var self, phrase, example, retry;
            self = this;
            letters.split('').forEach( function (c) {
                var model = new FlashcardModel({
                    type: style,
                    character: c,
                    id: c
                });
                if (speech) {
                    retry = self.getRetryPhrase(style, c);
                    model.set('retry', retry);
                    phrase = self.getSpokenPhrase(style, c);
                    example = self.getExamplePhrase(style,c);
                    model.set('phrase', phrase + '. ' + (example?example:''));
                }
                self.add(model);
            });
        }
    });
});
