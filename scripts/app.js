// Filename: app.js
define([
  'jquery',
  'backbone',
  'Router',
  'collections/FlashcardCollection',
  'views/PageView',
  'views/ConfigureView',
  'Extensions',
  'Helpers'
], function( $, Backbone, Router, FlashcardCollection, PageView, ConfigureView){
  var initialize = function(){
    var initGame, currentView, switchView, appRouter, configureTemplate;

    appRouter = new Router();

    switchView = function(newView) {
        if (currentView) currentView.close();
        currentView = newView;
        $(document).find('section').append(currentView.el);
    }

    initGame = function() {
      cardCollection = new FlashcardCollection();

      pageView = new PageView({
         tagName : 'article',
         collection : cardCollection,
         router: appRouter
      });

      pageView.render();

      return pageView;
    };

    appRouter.on('route:configure', function() {
        configureView = new ConfigureView({
          tagName : 'article',
          router : appRouter
        });
        switchView(configureView);
    });

    appRouter.on('route:letters', function() {
        pageView = initGame();
        pageView.collection.addCards('BCDFGHJKLMNPQRSTVWXYZ','consonant');
        pageView.collection.addCards('AEIOU','vowel');
        pageView.displayNewCard();
        switchView(pageView);
    });

    appRouter.on('route:numbers', function() {
        pageView = initGame();
        pageView.collection.addCards('0123456789','number');
        pageView.displayNewCard();
        switchView(pageView);
    });

    appRouter.on('route:all', function() {
        pageView = initGame();
        pageView.collection.addCards('BCDFGHJKLMNPQRSTVWXYZ','consonant');
        pageView.collection.addCards('AEIOU','vowel');
        pageView.collection.addCards('0123456789','number');
        pageView.displayNewCard();
        switchView(pageView);
    });

    Backbone.history.start({root: 'characters.html'});
  }

  return {
    initialize: initialize
  };
});