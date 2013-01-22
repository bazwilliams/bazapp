define([
  'underscore',
  'jquery',
  'text!../data/dictionary2.json'
], function(_, $, data){
		var dict = $.parseJSON(data);
		var getWord = function (character) {
			var candidates,selected;
			candidates = dict[character];
			selected = Math.floor(Math.random() * candidates.length)
			return candidates[selected];
		};
		return getWord;
});