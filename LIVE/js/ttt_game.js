/*
 * ==================================== *
 *                                      *
 * Tic Tac Toe Extreme                  *
 * A simple Javascript / HTML game      *
 * December of 2011                     *
 *                                      *
 * DESIGN: Sarah Hum                    *
 * JAVASCRIPT: Roxanne Guo              *
 *                                      *
 * ==================================== *


 * Hey, how are we doing? Email Sarah or myself at hello@sarahhum.com or 
 * roxane.guo@gmail.com respectively with comments and suggestions. 
 *
 * I'm just a first year Electrical Engineer student at University of
 * Waterloo who fortunately developed a constant craving for javascript.
 * Check out my recreation of Conway's Game of Life at http://roxanneguo.com
 * and let's follow each other on Twitter: @ Rawkcy.
 *
 * Pleasure meeting you.
 */


var tic_tac_toe = {
    player1_turn: true,
    number_of_turns: 0,
    number_of_matches: 1,
    max_number_of_matches: undefined
}


tic_tac_toe.new_game = function() {
    $("#p2_score").find("span").text(0);
    $("#p1_score").find("span").text(0);
    $(".newGameButton").text("NEW GAME");
    $(".newGameButton").removeClass("highlight");
    $(".player2_tag").addClass("player_tag_switch");
    $(".player1_tag").removeClass("player_tag_switch");

    tic_tac_toe.next_match();
    tic_tac_toe.number_of_matches = 1;
    tic_tac_toe.max_number_of_matches_count();

    $("#tie_breaker").hide();
    $("#matches").find("span#match_number").text(1);
    if ($("#player_tie").is(":visible")) $("#player_tie").animate({width: 'toggle'});
    if ($("#player_win").is(":visible")) $("#player_win").animate({width: 'toggle'});
}


tic_tac_toe.next_match = function(callback) {
    $(".x, .o").hide("fade", {}, 500);
    setTimeout(function() {$(".x, .o").removeClass("x o");}, 1000)
    setTimeout(function() {tic_tac_toe.bind_boxes();}, 1000)
    tic_tac_toe.number_of_turns = 0;

    if (typeof callback === "function") callback();
}


tic_tac_toe.bind_boxes = function() {
    $("div.allBoxes").click(function() {
        if (!$(this).find("div").hasClass("x") && !$(this).find("div").hasClass("o")) {
            // TODO: this symbol should be alterable by the user later
            if (tic_tac_toe.player1_turn) var symbol = "x";
            else var symbol = "o"; 
            tic_tac_toe.add_player_symbol($(this), symbol);
        }
    });
}


tic_tac_toe.add_player_symbol = function(box, symbol) {
    var target = box.find("div");
    target.addClass(symbol);
    target.show("bounce", { times:2 }, 150);

    tic_tac_toe.check_win(target);
    tic_tac_toe.switch_turn();
}


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


tic_tac_toe.check_win = function(target) {
    tic_tac_toe.number_of_turns++;
    var player1_tag = $("p.player1_tag").text();
    var player2_tag = $("p.player2_tag").text();
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

    else if (tic_tac_toe.number_of_turns == 9) {
        $("#tie_game").show().delay(3500).hide("fade", {}, 2000);
        setTimeout(function() {
            $("div.allBoxes").find("div").show("pulsate", { times:2 }, 1000);
        }, 750)
        setTimeout(function() {$(".x, .o").hide("fade", {}, 500);}, 4000);
        setTimeout(function() {$(".x, .o").removeClass("x o");}, 7000)
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


tic_tac_toe.update_score = function(player_score) {
    var score = parseInt(player_score.text()) + 1;
    player_score.text(score);
}


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
    } else $("#matches").find("span#match_number").text(tic_tac_toe.number_of_matches);
}


$(document).ready(function() {
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
        tic_tac_toe.new_game();
    });

    $("button.startButton, button.return_button").click(function() {
      $("#startPanel").slideToggle("slow");
      if ($("#instructionsPanel").is(":visible")) $("#instructionsPanel").slideToggle("slow");
    });

    $("#instructionsButton, #instructionsBack").click(function() {
      $("#instructionsPanel").animate({width: 'toggle'});
    });
});


function stopRKey(evt) {
   var evt = (evt) ? evt : ((event) ? event : null);
   var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
   if ((evt.keyCode == 13) && (node.type=="text")) {return false;}
} document.onkeypress = stopRKey; 
