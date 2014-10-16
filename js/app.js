"use strict";

																										// GLOBALS
var T = 0,																					// time
		pics = 13;																			// number of images


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
	var f = new Fact($("#option").val()),
			count = 0,
			max = $("#number").val();
			
	$("#fact").append(f.div);
	$("#fact").append($("<input>").attr("type","text").attr("id","ans"));
	$("#count").text(count);
	$("#results").show();
	
	$("#ans").keypress(function(e) {
    if (e.which == 13 && $(this).val() == f.ans) {
			count++;
			picReveal(count);
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
	picStart(max);
	$("#ans").focus();
}

function picStart(num) {																// adds a picture show for fun
	var ran = Math.floor((Math.random() * pics) + 1),
			$img = $("#image"+ran),
			$cover = $("<div>").addClass('tran').attr('id','cover'),
			w = $img.width(),
			h = $img.height(),
			dim = numPair(num),
			x = w>h? dim[1] : dim[0],
			y = w>h? dim[0] : dim[1];
	
	$img.show();
	var pos = $img.position();
	$cover.width(w).height(h).css({
		"position": "absolute",
		"left": pos.left,
		"top": pos.top});
	
	var dots = randomArray(num);
		
	for (var i=0; i<y; i++) {
		for (var j=0; j<x; j++) {
			var $tile = $("<div>").addClass('white').attr('id', 'tile'+dots[i*x+j]);
			$tile.width(w/x+1).height(h/y+1).css({
			"position": "absolute",
			"left": j*w/x,
			"top": i*h/y});
			$cover.append($tile);
		}
	}
	$("#pics").append($cover);
}

function stop() {																		// stops and cleans up after a fact set
	$("#facts").hide();
	$("#fact").empty();
	$("#pics").children().hide();
	$("#cover").remove();
	T = timerToggle(T);
}
 
function main() {																		// MAIN EVENTS

	for (var i=0; i<pics; i++) {													// loads images (an optional part)
		var $img = $("<img>").attr({
			'id': 'image'+(i+1),
			'src': 'images/image' + (i+1) + '.jpg'
			}).addClass('image').hide();
		$("#pics").append($img);
	}
	$("#pics").show();
	
	$(window).load(function() {												// waits until loaded
	
		$("#start").click( function() {									// initializes start button
			if ( $(this).val() === "Start" ) {
				$(this).val("Stop");
				start();
			} else {
				$(this).val("Start");
				stop();
			}
		});
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

function picReveal(index) {
	$("#tile"+(index-1)).addClass('tran');
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

function randomArray(num) { 												// returns a random array of shuffled numbers
	var arr = [],
			ran_arr = [];
	for (var i=0; i<num; i++) { arr.push(i); }
	for (var i=0; i<num; i++) {
		var ran = Math.floor(Math.random() * (num-i));
		ran_arr.push(arr[ran]);
		arr.splice(ran,1);
	}
	return ran_arr;
}

