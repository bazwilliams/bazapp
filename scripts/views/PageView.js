define([
    'jquery',
    'backbone',
    'views/RocketView',
    'views/FlashcardView',
    'views/ScoresView'
], function($, Backbone, RocketView, FlashcardView, ScoresView){
    var PageView = Backbone.View.extend({

        initialize: function () {
            var self, keyReleased;

            this.collection.bind('complete', this.handleComplete, this);

            keyReleased = true;

            self = this;
            $(document).bind('keydown.flashcard', function (e) {
                var code, character;
                e.preventDefault();
                if (keyReleased) {
                    keyReleased = false;
                    code = (e.keyCode ? e.keyCode : e.which);
                    character = String.fromCharCode(code);
                    if (self.collection.get(character)) {
                        if (self.handleCharacter(character)) {
                            self.displayNewCard();
                        }
                    }
                }
            });

            $(document).bind('keyup.flashcard', function (e) {
                keyReleased = true;
            });

            this.rocketView = new RocketView({
                collection : this.collection
            });

            this.$el.append(this.rocketView.el);
        },

        announceAttempt: true,
        
        gameComplete: false,

        handleComplete: function() {
            var scoresView;

            this.gameComplete = true;
            this.rocketView.close();
            this.currentFlashCard.close();
            $(document).unbind('keydown.flashcard');
            $(document).unbind('keyup.flashcard');

            scoresView = new ScoresView({
                el : this.$el,
                collection : this.collection,
                router: this.options.router
            });
        },

        handleCharacter: function(characterPressed) {
            var success, failure;

            this.collection.increaseAttempt(this.announceAttempt);
            if (characterPressed === this.currentFlashCard.model.get('character')) {
                success = this.currentFlashCard.model.get('success')+1;
                this.currentFlashCard.model.set('success',success);
                this.collection.sort();
                this.collection.trigger('success');
                this.announceAttempt = true;
                this.collection.resetAttempt(this.announceAttempt);
                return true;
            }
            else {
                if (this.collection.attempt === 1) {
                    failure = this.currentFlashCard.model.get('failure')+1;
                    this.currentFlashCard.model.set('failure',failure);
                    this.collection.sort();
                } else if (this.collection.attempt > 2) {
                    //after 3 attempts, change the card anyway - but don't announce any more attempts
                    this.announceAttempt = false;
                    this.collection.resetAttempt(this.announceAttempt);
                    return true;
                }
                return false;
            }
        },

        displayNewCard: function() {
            if (!this.gameComplete) {
                var newCardModel = this.collection.getNextCard();
                if (newCardModel) {
                    this.replaceCard(newCardModel);
                }
            }
        },

        replaceCard: function(newCardModel) {
            var newCardView;
            
            newCardView = new FlashcardView({
                model: newCardModel
            });

            if (this.currentFlashCard) {
                this.currentFlashCard.close();
            }
            this.$el.append(newCardView.el);

            this.currentFlashCard = newCardView;
        }
    });

	return PageView;
	
});