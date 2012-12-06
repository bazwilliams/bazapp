// Filename: app.js
define([
  'jquery',
  'backbone',
  'Router',
  'collections/FlashcardCollection',
  'views/PageView'
], function( $, Backbone, Router, FlashcardCollection, PageView){
  var initialize = function(){
    var cardCollection, pageView, appRouter;

    cardCollection = new FlashcardCollection();

    // pageView = new PageView({
    //     el : 'article',
    //     collection : cardCollection
    // });

    appRouter = new Router();

    appRouter.on('route:letters',function() {
        cardCollection.reset();
        cardCollection.addCards('BCDFGHJKLMNPQRSTVWXYZ','consonant');
        cardCollection.addCards('AEIOU','vowel');
        addCards('AEIOU','vowel');
        pageView.displayNewCard();
    });

    appRouter.on('route:numbers', function() {
        cardCollection.reset();
        cardCollection.addCards('0123456789','number');
        pageView.displayNewCard();
    });

    appRouter.on('route:all', function() {
        cardCollection.reset();
        cardCollection.addCards('BCDFGHJKLMNPQRSTVWXYZ','consonant');
        cardCollection.addCards('AEIOU','vowel');
        cardCollection.addCards('0123456789','number');
        pageView.displayNewCard();
    });

    Backbone.history.start({root: 'characters.html'});

    // pageView.render();
  }

  return {
    initialize: initialize
  };
});