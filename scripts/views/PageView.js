require([
    'jquery',
    'backbone',
    'views/ScoresView',
    'views/FlashcardView'
], function($, Backbone, ScoresView, FlashcardView){
    var PageView = Backbone.View.extend({
        initialize: function () {
            var self, scoresView, keyReleased;

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
                        self.collection.attempt++;
                        if (self.updateScore(character)) {
                            self.displayNewCard();
                        }
                        scoresView.render();
                    }
                }
            });

            $(document).keyup('keyup.flashcard', function (e) {
                keyReleased = true;
            });

            scoresView = new ScoresView({
                collection : cardCollection
            })

            this.$el.append(scoresView.el);
        },

        updateScore: function(characterPressed) {
            var success, failure;
            if (characterPressed === this.currentView.model.get('character')) {
                success = this.currentView.model.get('success')+1;
                this.currentView.model.set('success',success);
                this.collection.sort();
                return true;
            }
            else {
                if (this.collection.attempt === 1) {
                    failure = this.currentView.model.get('failure')+1;
                    this.currentView.model.set('failure',failure);
                    this.collection.sort();
                } else if (this.collection.attempt > 2) {
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
            this.$el.append(newCardView.el);
        }
    });

	return PageView;
	
});