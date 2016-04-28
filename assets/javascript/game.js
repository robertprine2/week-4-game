//waits for js to start until after html has loaded

$(document).ready(function(){

	// object of characters that can be chosen 

	var game = {

		// Array with characters

		characters: [

			{name: "c3p0",
			health: 100,
			attack: 20,
			increase: 20,
			counterattack: 4,
			image: "<img src='assets/images/c3p0.jpg'>"},

			{name: "King Jar Jar",
			health: 150,
			attack: 10,
			increase: 10,
			counterattack: 16,
			image: "<img src='assets/images/kingjar.jpg'>"},

			{name: "Jar Jar",
			health: 120,
			attack: 15,
			increase: 15,
			counterattack: 8,
			image: "<img src='assets/images/jar.jpg'>"},

			{name: "Sith Jar Jar",
			health: 180,
			attack: 4,
			increase: 4,
			counterattack: 32,
			image: "<img src='assets/images/sithjar.jpg'>"}
		],

		// Variable to keep track of if you won the game or still have enemies to defeat

		compKills: 0,

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
				c.append('<p id="hp">' + game.characters[i].health + '</p>');

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
			
			$(".enemy").on("click", function() {
				if (game.clicks == 1) {
					game.clicks++;
					console.log(this);
					console.log(game.clicks);
					$(this).removeClass("enemy").addClass("defender");
					$(this).appendTo("#defender");
					$("#attackMsg").empty();
					$("#counterattackMsg").empty();
				}
			});
		},

		// Attack Button if no one to fight "There is no enemy here. Pick someone to fight!" otherwise Attack button deals damage, gets counter attacked, updates health on button, updates information about what is going on at the bottom

		attack: function () {

			$("#attack").on("click", function() {

				if ($("#defender button").hasClass("defender")) {

					var player = game.characters[$(".mine").data('index')];

					var comp = game.characters[$(".defender").data('index')];

					comp.health = comp.health - player.attack;

					$("#attackMsg").html("You attacked " + comp.name +" for " + player.attack + " damage.");

					$(".defender #hp").html(comp.health);

					player.attack = player.attack + player.increase;

					player.health = player.health - comp.counterattack;

					$("#counterattackMsg").html(comp.name + " attacked you back for " + comp.counterattack + " damage.");

					$(".mine #hp").html(player.health);
					console.log($(".mine #hp"));

					// If you beat a character: "You have defeated .name! Choose another enemy to fight!" clicks reset to 1

					game.compDeath();
					
					// If you die "You have been defeated...GAME OVER!!!" add a restart button

					game.death();

				} // End of if statement you have a defender

				else {
					$("#attackMsg").html("There is no enemy. Pick someone to fight!");
				} // End of else statement you have a defender
			}); // End of attack button on click function
		}, // End of Attack function

		// If you die "You have been defeated...GAME OVER!!!" add a restart button

		death: function() {
			
			var player = game.characters[$(".mine").data('index')];

			var comp = game.characters[$(".defender").data('index')];

			if (player.health <= 0) {
				$("#attack").hide();
				$("#attackMsg").html("You have been defeated...GAME OVER!!!");
				$("#counterattackMsg").empty();
				$("#reset").html("<button>Reset</button");
				game.reset();
			}
		},

		// If you beat a character: "You have defeated .name! Choose another enemy to fight!" clicks reset to 1

		compDeath: function() {
			
			var player = game.characters[$(".mine").data('index')];

			var comp = game.characters[$(".defender").data('index')];

			if (comp.health <= 0) {
				
				game.clicks = 1;
				$(".defender").hide();
				$(".defender").removeClass("defender");
				if (game.compKills == 2) {
					$("#attack").hide();
					$("#attackMsg").html("You won!!! GAME OVER!!!");
					$("#counterattackMsg").empty();
					$("#reset").html("<button>Reset</button>");
					game.reset();
				} // End if statement beat them all

				else {
					game.compKills++;
					$("#attackMsg").html("You have defeated " + comp.name + " . Choose another enemy to fight!");
					$("#counterattackMsg").empty();
					game.pick();
				} // End else beat them all
			} // End if statement comp 0 hp
		}, // End function compDeath

		// Reset button to reset the game

		reset: function() {
			$("#reset").on("click", function() {
				location.reload();
			})
		}

	}; // Ends game object

	// List char buttons on screen

	game.charList();

	// Pick character to be your character The rest of the chars move to enemies available to attack and get red background Pick character to fight/send to defender and get black background

	game.pick();
 

	// *******two reset button areas for what the reset does that means I should make a function for it



}); //ends ready function