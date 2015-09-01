define([
  'jquery',
  'text!../data/p1.json'
], function($, data){
		var dict = $.parseJSON(data);
		return function (character) {
			var candidates,selected;
			candidates = dict[character];
			selected = Math.floor(Math.random() * candidates.length);
			return candidates[selected];
		};
});