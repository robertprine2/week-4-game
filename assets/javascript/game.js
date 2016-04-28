//waits for js to start until after html has loaded

$(document).ready(function(){

	// object of characters that can be chosen 

	var game = {

		// Array with characters

		characters: [

			{name: "c3p0",
			health: 120,
			attack: 6,
			counterattack: 25,
			image: "<img src='assets/images/c3p0.jpg'>"},

			{name: "King Jar Jar",
			health: 100,
			attack: 6,
			counterattack: 25,
			image: "<img src='assets/images/kingjar.jpg'>"},

			{name: "Jar Jar",
			health: 150,
			attack: 10,
			counterattack: 25,
			image: "<img src='assets/images/jar.jpg'>"},

			{name: "Sith Jar Jar",
			health: 180,
			attack: 10,
			counterattack: 25,
			image: "<img src='assets/images/sithjar.jpg'>"}
		],

		// List characters on top of screen for player to choose from

		charList: function() {
			for (var i = 0; i < game.characters.length; i++) {

				var c = $('<button>');
				c.addClass("char " + game.characters[i].name);
				
				c.attr('data-index', i); 
				c.attr('data-name', game.characters[i].name);
				c.append('<p>' + game.characters[i].name + '</p>');
				c.append(game.characters[i].image);
				c.append('<p>' + game.characters[i].health + '</p>');

				$(".charSel").append(c);
			} //ends for loop
		} // ends charList method
	}

	// List char buttons on screen

	game.charList();





}); //ends ready function