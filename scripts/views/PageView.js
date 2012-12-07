define([
    'jquery',
    'backbone',
    'views/RocketView',
    'views/FlashcardView'
], function($, Backbone, RocketView, FlashcardView){
    var PageView = Backbone.View.extend({
        initialize: function () {
            var self, rocketView, keyReleased;

            keyReleased = true;

            self = this;
            $(document).keydown('keydown.flashcard', function (e) {
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

            $(document).keyup('keyup.flashcard', function (e) {
                keyReleased = true;
            });

            rocketView = new RocketView({
                collection : this.collection
            })

            this.$el.append(rocketView.el);
        },

        announceAttempt: true,

        handleCharacter: function(characterPressed) {
            var success, failure;

            this.collection.increaseAttempt(this.announceAttempt);
            if (characterPressed === this.currentView.model.get('character')) {
                success = this.currentView.model.get('success')+1;
                this.currentView.model.set('success',success);
                this.collection.sort();
                this.collection.trigger('success');
                this.announceAttempt = true;
                this.collection.resetAttempt(this.announceAttempt);
                return true;
            }
            else {
                if (this.collection.attempt === 1) {
                    failure = this.currentView.model.get('failure')+1;
                    this.currentView.model.set('failure',failure);
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
            var newCardModel = this.collection.getNextCard();
            if (newCardModel) {
                this.replaceCard(newCardModel);
            }
        },

        replaceCard: function(newCardModel) {
            var newCardView;
            
            newCardView = new FlashcardView({
                model: newCardModel
            });

            if (this.currentView) {
                this.currentView.remove();
            }

            this.currentView = newCardView;

            newCardView.render();
            this.$el.append(newCardView.el);
        }
    });

	return PageView;
	
});