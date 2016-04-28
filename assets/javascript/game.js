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

		// Variable to switch between button clicks to move the game forward

		clicks: 0,

		// List characters on top of screen for player to choose from

		charList: function() {
			for (var i = 0; i < game.characters.length; i++) {

				var c = $('<button>');
				c.addClass("char ");
				
				c.attr('data-index', i); 
				c.attr('data-name', game.characters[i].name);
				c.append('<p>' + game.characters[i].name + '</p>');
				c.append(game.characters[i].image);
				c.append('<p>' + game.characters[i].health + '</p>');

				$(".charSel").append(c);

			} //ends for loop

		}, // ends charList method

		// Pick character to be your character then move the rest to Enemies available to attack

		pick: function() {
			$(".char").on("click", function() {
				if (game.clicks <=0) {
					game.clicks++;
					console.log(game.clicks);
					$(this).removeClass("char").addClass("mine");
					$("button.mine").siblings().removeClass("char").addClass("enemy");
					$("button.mine").siblings().appendTo("#enemy");
					$(this).appendTo(".your");

					// Pick character to fight/send to defender

					game.setEnemyListener();

					// Attack Button if no one to fight "There is no enemy here. Pick someone to fight!" otherwise Attack button deals damage, gets counter attacked, updates health on button, updates information about what is going on at the bottom

					game.attack();

				} // End clicks if
				
			});
		},

		// Pick character to fight/send to defender

		setEnemyListener: function() {
			console.log(this);
			$(".enemy").on("click", function() {
				if (game.clicks > 0) {
					game.clicks++;
					console.log(this);
					console.log(game.clicks);
					$(this).removeClass("enemy").addClass("defender");
					$(this).appendTo("#defender");
				}
			});
		},

		// Attack Button if no one to fight "There is no enemy here. Pick someone to fight!" otherwise Attack button deals damage, gets counter attacked, updates health on button, updates information about what is going on at the bottom

		attack: function () {

			console.log($("#defender").hasClass("defender"));
			$("#attack").on("click", function() {

				if ($("#defender").hasClass("defender")) {

				}

				else {
					$("#attackMsg").html("There is no enemy. Pick someone to fight!");
				}
			});
		},

	}; // Ends game object

	// List char buttons on screen

	game.charList();

	// Pick character to be your character The rest of the chars move to enemies available to attack and get red background Pick character to fight/send to defender and get black background

	game.pick();
 


	// If you die "You have been defeated...GAME OVER!!!" add a restart button

	// If you beat a character: "You have defeated .name! Choose another enemy to fight!" clicks reset to 1


	// call appendTo from enemies able to attack to defender

	// If you have defeated all enemies info: "You won!!! GAME OVER!!!" append restart button under info



}); //ends ready function