// Filename: app.js
define([
  'jquery',
  'backbone',
  'Router',
  'models/ConfigModel',
  'collections/FlashcardCollection',
  'views/PageView',
  'views/ConfigureView',
  'Extensions',
  'Helpers'
], function( $, Backbone, Router, ConfigModel, FlashcardCollection, PageView, ConfigureView){
  var initialize = function(){
    var initGame, gameConfig, currentView, switchView, appRouter, configureTemplate;

    appRouter = new Router();

    gameConfig = new ConfigModel();

    switchView = function(newView) {
        if (currentView) currentView.close();
        currentView = newView;
        $(document).find('section').append(currentView.el);
    }

    initGame = function(gameSpeed) {
      cardCollection = new FlashcardCollection();

      pageView = new PageView({
         tagName : 'article',
         collection : cardCollection,
         router: appRouter,
         gameSpeed: gameSpeed
      });

      pageView.render();

      return pageView;
    };

    appRouter.on('route:configure', function() {
        configureView = new ConfigureView({
          tagName : 'article',
          router : appRouter,
          model : gameConfig
        });
        switchView(configureView);
    });

    appRouter.on('route:letters', function(gameSpeed) {
        pageView = initGame(gameSpeed);
        pageView.collection.addCards('BCDFGHJKLMNPQRSTVWXYZ','consonant');
        pageView.collection.addCards('AEIOU','vowel');
        pageView.displayNewCard();
        switchView(pageView);
    });

    appRouter.on('route:numbers', function(gameSpeed) {
        pageView = initGame(gameSpeed);
        pageView.collection.addCards('0123456789','number');
        pageView.displayNewCard();
        switchView(pageView);
    });

    appRouter.on('route:all', function(gameSpeed) {
        pageView = initGame(gameSpeed);
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