"use strict";

																										// GLOBALS
var T = 0;																					// time

																										// FACT FUNCTIONS
function Fact(type) {																// fact object
	this.type = type || "add";
	this.set();
}

Fact.prototype.set = function() {										// setting fact type
	if (this.type === "ran") {
		var i = Math.floor(Math.random() * 2);
		if (i === 0) this.reset("add");
		else this.reset("sub");
	} else this.reset(this.type);
}

Fact.prototype.reset = function(type) {							// resetting fact numbers
	this.nums = random3();
	if ( type === "add" ) {
		this.div = $("<p>").text(this.nums[0] + "\n+" + this.nums[1]);
		this.ans = this.nums[2];
	} else if ( type === "sub" ) {
		this.div = $("<p>").text(this.nums[2] + "\n-" + this.nums[1]);
		this.ans = this.nums[0];
	} 
}

																										// PRIMARY FUNCTIONS
																										
function start() {																	// starting a new set of related facts

	var f = new Fact($("input[name='typeOptions']:checked").val()),
			count = 0,
			max = $("input[name='numOptions']:checked").val();
			
	$("#fact").append(f.div);
	$("#fact").append($("<input>").attr("type","text").attr("id","ans"));
	$("#count").text(count);
	$("#results").show();
	
	$("#ans").keypress(function(e) {
    if (e.which == 13 && $(this).val() == f.ans) {
			count++;
			$("#count").text(count);
			if ( count == max ) {
				$("#start").val("Start");
				alert("YOU DID IT!");
				stop();
			} else {
      f.set();
			update(f.div);			
			}
    }
	});
	
	T = timerToggle(T);
	$("#facts").show();
	$("#pad").show();
	$("#ans").focus();
}

function stop() {																		// stops and cleans up after a fact set
	$("#facts").hide();
	$("#pad").hide();
	$("#fact").empty();
	$("#cover").remove();
	T = timerToggle(T);
}

 
function main() {																		// MAIN EVENTS
	
	$("#start").click( function() {										// initializes start button
		if ( $(this).val() === "Start" ) {
			$(this).val("Stop");
			start();
		} else {
			$(this).val("Start");
			stop();
		}
	});
	
	$(".padbtn").click( function() {									// initializes pad buttons
		var input = $(this).text(),
				ans = $("#ans").val();
				
		switch (input) {
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				$("#ans").val(ans + input);
				$("#ans").focus();
				break;
			case 'Ok':
				var e = jQuery.Event("keypress");
				e.which = 13;
				$("#ans").trigger(e);
				$("#ans").focus();
				break;
			case 'Del':
				$("#ans").val('');
				$("#ans").focus();
				break;
			default:
		}
	});

}

$(document).ready(main)

																										// SUPPORTING FUNCTIONS

function random3(max) {															// set of two random numbers and their sum
	max = max || 10;
	var rnums = [0,0,0];
	rnums[0] = Math.floor((Math.random() * max) + 0); // random number between 0 and 9
	rnums[1] = Math.floor((Math.random() * max) + 0);
	rnums[2] = rnums[0] + rnums[1];
	return rnums;
}

function update($div) {															// updating html with new fact data
	$("#fact p").replaceWith($div);
	$("#ans").val("");
}

function numPair(num) {															// return largest pair of multipliers
	var sq = Math.floor(Math.sqrt(num));
	for (var i=sq; i>0; i--) {
		if (num % i === 0) return [i, num/i];
	}
	return 0;
}

function timerToggle(time) {												// sets timers
	if (time > 0) {
		var now = new Date(),
				dif = Math.round((now.getTime() - time) / 1000),
				sec = dif % 60,
				min = (dif - sec)/60;
		$("#time").text(min + " min " + sec + " sec");
		$("#timer").show();
		return 0;
	}
	else {
		var now = new Date();
		$("#timer").hide();
		return now.getTime();
	}
}


