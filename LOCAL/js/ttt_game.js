function stopRKey(evt) {
   var evt = (evt) ? evt : ((event) ? event : null);
   var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
   if ((evt.keyCode == 13) && (node.type=="text")) {return false;}
}
document.onkeypress = stopRKey; 

tic_tac_toe.new_game = function() {
    // Initialize or reset the gameboard
    // 1. Remove all existing x and o
    // 2. Set number of matches down to 0

    // Clear the score board for each player
    $("#p2_score").find("span").text(0);
    $("#p1_score").find("span").text(0);
    $(".newGameButton").text("NEW GAME");
    $(".newGameButton").removeClass("highlight");

    // Reset the highlighting of the name to show who goes first
    // to show it is now player 1's turn
    $(".player2_tag").addClass("player_tag_switch");
    $(".player1_tag").removeClass("player_tag_switch");

    // Start a new tic tac toe match
    tic_tac_toe.next_match();
    tic_tac_toe.number_of_matches = 1;
    tic_tac_toe.max_number_of_matches_count();

    $("#tie_breaker").hide();
    $("#matches").find("span#match_number").text(1);
    if ($("#player_tie").is(":visible"))
        $("#player_tie").animate({width: 'toggle'});
    if ($("#player_win").is(":visible"))
        $("#player_win").animate({width: 'toggle'});
}
$("#instructionsPanel").animate({width: 'toggle'});

tic_tac_toe.next_match = function(callback) {
    // Clear the gameboard
    // Return the player status to "player1" (default first one to go)
    // Reset the number of turns and back to 0
    $(".x, .o").hide("fade", {}, 500);
    setTimeout(function() {$(".x, .o").removeClass("x o");}, 1000)
    // Set timeout or else the class dissapears really fast .. weird
    setTimeout(function() {tic_tac_toe.bind_boxes();}, 1000)
    tic_tac_toe.number_of_turns = 0;

    if (typeof callback === "function") {
        callback();
    }
}

tic_tac_toe.bind_boxes = function() {
    $("div.allBoxes").click(function() {
        // Only add a class to the box if it does not have a class
        if (!$(this).find("div").hasClass("x") && !$(this).find("div").hasClass("o")) {
            // TODO: this symbol will be alterable by the user later
            // Assign symbols depending on who's turn it is
            if (tic_tac_toe.player1_turn) var symbol = "x";
            else var symbol = "o"; 
            
            // Adds the player symbol to the box being clicked
            tic_tac_toe.add_player_symbol($(this), symbol);
        }
    });
}

tic_tac_toe.add_player_symbol = function(box, symbol) {
    // Animates the player's symbol being added
    var target = box.find("div");
    target.addClass(symbol);
    target.show("bounce", { times:2 }, 150);

    // Check if we have a winner
    tic_tac_toe.check_win(target);
    // Switch turns
    tic_tac_toe.switch_turn();
}

// Checks to see who"s turn it is and switches to the other player
tic_tac_toe.switch_turn = function() {
    if (tic_tac_toe.player1_turn) {
        tic_tac_toe.player1_turn = false;
        $(".player1_tag").addClass("player_tag_switch");
        $(".player2_tag").removeClass("player_tag_switch");
    }
    else {
        tic_tac_toe.player1_turn = true;
        $(".player1_tag").removeClass("player_tag_switch");
        $(".player2_tag").addClass("player_tag_switch");
    }
}

// Checks if a winning combination has been achieved. If a winning combo
// was found, the game will send an alert to the player and reset game
tic_tac_toe.check_win = function(target) {
    tic_tac_toe.number_of_turns++;
    var player1_tag = $("p.player1_tag").text();
    var player2_tag = $("p.player2_tag").text();
    // Matches the class_name (cn) and which player score to update
    if (tic_tac_toe.player1_turn) {
        var cn = "x";
        $("#player1_win").find("#win").text(player1_tag);
        var winner = $("#player1_win");
        var player_score = $("#p1_score").find("span");
    }
    else {
        var cn = "o";
        $("#player2_win").find("#win").text(player2_tag);
        var winner = $("#player2_win");
        var player_score = $("#p2_score").find("span");
    }

    // TODO: There must be a more optimal way to check if a player has won
    var b1 = $("#box1").find("div"); var b2 = $("#box2").find("div"); var b3 = $("#box3").find("div");
    var b4 = $("#box4").find("div"); var b5 = $("#box5").find("div"); var b6 = $("#box6").find("div");
    var b7 = $("#box7").find("div"); var b8 = $("#box8").find("div"); var b9 = $("#box9").find("div");

    var combo1 = (b1.hasClass(cn) && b2.hasClass(cn) && b3.hasClass(cn));
    var combo2 = (b4.hasClass(cn) && b5.hasClass(cn) && b6.hasClass(cn));
    var combo3 = (b7.hasClass(cn) && b8.hasClass(cn) && b9.hasClass(cn));
    var combo4 = (b1.hasClass(cn) && b4.hasClass(cn) && b7.hasClass(cn));
    var combo5 = (b2.hasClass(cn) && b5.hasClass(cn) && b8.hasClass(cn));
    var combo6 = (b3.hasClass(cn) && b6.hasClass(cn) && b9.hasClass(cn));
    var combo7 = (b1.hasClass(cn) && b5.hasClass(cn) && b9.hasClass(cn));
    var combo8 = (b3.hasClass(cn) && b5.hasClass(cn) && b7.hasClass(cn));

    if ( combo1 || combo2 || combo3 || combo4 || combo5 || combo6 || combo7 || combo8 ) {
        $("div.allBoxes").unbind("click");
        winner.show().delay(3500).hide("fade", {}, 2000);
        if (combo1) {
            setTimeout(function() {
                b1.effect("pulsate", { times:2 }, 600);
                b2.effect("pulsate", { times:2 }, 600);
                b3.effect("pulsate", { times:2 }, 600);
            }, 750)
        }
        if (combo2) {
            setTimeout(function() {
                b4.effect("pulsate", { times:2 }, 600);
                b5.effect("pulsate", { times:2 }, 600);
                b6.effect("pulsate", { times:2 }, 600);
            }, 750)
        }
        if (combo3) {
            setTimeout(function() {
                b7.effect("pulsate", { times:2 }, 600);
                b8.effect("pulsate", { times:2 }, 600);
                b9.effect("pulsate", { times:2 }, 600);
            }, 750)
        }
        if (combo4) {
            setTimeout(function() {
                b1.effect("pulsate", { times:2 }, 600);
                b4.effect("pulsate", { times:2 }, 600);
                b7.effect("pulsate", { times:2 }, 600);
            }, 750)
        }
        if (combo5) {
            setTimeout(function() {
                b2.effect("pulsate", { times:2 }, 600);
                b5.effect("pulsate", { times:2 }, 600);
                b8.effect("pulsate", { times:2 }, 600);
            }, 750)
        }
        if (combo6) {
            setTimeout(function() {
                b3.effect("pulsate", { times:2 }, 600);
                b6.effect("pulsate", { times:2 }, 600);
                b9.effect("pulsate", { times:2 }, 600);
            }, 750)
        }
        if (combo7) {
            setTimeout(function() {
                b1.effect("pulsate", { times:2 }, 600);
                b5.effect("pulsate", { times:2 }, 600);
                b9.effect("pulsate", { times:2 }, 600);
            }, 750)
        }
        if (combo8) {
            setTimeout(function() {
                b3.effect("pulsate", { times:2 }, 600);
                b5.effect("pulsate", { times:2 }, 600);
                b7.effect("pulsate", { times:2 }, 600);
            }, 750)
        }
        setTimeout(function() {tic_tac_toe.next_match(function() {
            if (tic_tac_toe.max_number_of_matches == (tic_tac_toe.number_of_matches - 1))
                tic_tac_toe.game_over();
        });}, 4000);
        tic_tac_toe.update_score(player_score);
        if (tic_tac_toe.max_number_of_matches) tic_tac_toe.max_matches_increment();
    }

    // End the game in a tie if there has been 9 turns and no winner
    else if (tic_tac_toe.number_of_turns == 9) {
        $("#tie_game").show().delay(3500).hide("fade", {}, 2000);
        setTimeout(function() {
            $("div.allBoxes").find("div").show("pulsate", { times:2 }, 1000);
        }, 750)
        setTimeout(function() {$(".x, .o").hide("fade", {}, 500);}, 4000);
        setTimeout(function() {$(".x, .o").removeClass("x o");}, 7000)
        // Set timeout or else the class dissapears really fast .. weird
        setTimeout(function() {tic_tac_toe.bind_boxes();}, 7000)
        tic_tac_toe.number_of_turns = 0;

    }
}

tic_tac_toe.game_over = function() {
    $(".allBoxes").unbind("click");
    var player1_s = $("#p1_score").find("span").text();
    var player2_s = $("#p2_score").find("span").text();

    if (player1_s == player2_s) tic_tac_toe.tie_game(player1_s, player2_s);
    else tic_tac_toe.player_win(player1_s, player2_s);
}

tic_tac_toe.tie_game = function(player1_s, player2_s) {
    $("#player_tie").find("span#player1").text(player1_s);
    $("#player_tie").find("span#player2").text(player2_s);
    $("button#tie_breaker_button").click(function() {
        $("#player_tie").animate({width: 'toggle'});
        $("#tie_breaker").show();
    })
    $("#player_tie").animate({width: 'toggle'});
}

tic_tac_toe.player_win = function(player1_s, player2_s) {
    var player1_tag = $("p.player1_tag").text();
    var player2_tag = $("p.player2_tag").text();
    var $win_div = $("div#player_win");
    if (player1_s > player2_s) $win_div.find("span#winner").text(player1_tag);
    else $win_div.find("span#winner").text(player2_tag);

    $win_div.find("span#player1").text(player1_s);
    $win_div.find("span#player2").text(player2_s);
    setTimeout(function(){$win_div.animate({width: 'toggle'});}, 4000);
    $(".newGameButton").text("REMATCH");
    $(".newGameButton").addClass("highlight");
}

// Update score for each player
tic_tac_toe.update_score = function(player_score) {
    var score = parseInt(player_score.text()) + 1;
    player_score.text(score);
}

// TODO: This function will be altered when the submission form is moved
// to a separate window. Right now this does not work because the page 
// reload onClick and the changes get overwritten
tic_tac_toe.update_players = function() {
    var player1 = $("input.player1").val();
    var player2 = $("input.player2").val();

    if (player1) $("p.player1_tag").text(player1);
    if (player2) $("p.player2_tag").text(player2);
}

tic_tac_toe.max_number_of_matches_count = function() {
    var max_matches = $("input.max_num_matches").val();
    if (parseInt(max_matches) > 0) {
        tic_tac_toe.max_number_of_matches = parseInt(max_matches);
        $("#matches").find("span#id_max_matches").text(tic_tac_toe.max_number_of_matches);
        $("#freeplay").hide();
        $("#matches").show();
    } else {
        $("#matches").hide();
        $("#freeplay").show();
    }
}

tic_tac_toe.max_matches_increment = function() {    
    tic_tac_toe.number_of_matches++;
    if (tic_tac_toe.number_of_matches > tic_tac_toe.max_number_of_matches) {
        $("#matches, #freeplay").hide();
        tic_tac_toe.number_of_matches = 1;
        tic_tac_toe.max_number_of_matches = 1;
        tic_tac_toe.game_over();
    }
    else $("#matches").find("span#match_number").text(tic_tac_toe.number_of_matches);
}

// document.ready must be at the end of the file because it calls functions
// which are declared up above
$(document).ready(function() {
    // Allow all boxes on the gameboard to be added classes
    tic_tac_toe.bind_boxes();
    $(".player2_tag").addClass("player_tag_switch");

    $("button.update_players_button").click(function() {
        tic_tac_toe.update_players();
        return false;
    });

    $("button.max_num_button").click(function() {
        tic_tac_toe.max_number_of_matches_count();
        return false;
    });

    $("button.newGameButton, button.return_button").click(function() {
        // Starts a new fresh game as if the page reloaded
        tic_tac_toe.new_game();
    });

    $("button.startButton, button.return_button").click(function() {
      $("#startPanel").slideToggle("slow");
      // If the help text is down and the player stars, retract the help slide
      if ($("#instructionsPanel").is(":visible"))
          $("#instructionsPanel").slideToggle("slow");
    });

    $("#instructionsButton, #instructionsBack").click(function() {
      $("#instructionsPanel").animate({width: 'toggle'});
    });
});
