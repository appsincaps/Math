"use strict";

var T = 0;

function random3(max) {
	max = max || 10;
	var rnums = [0,0,0];
	rnums[0] = Math.floor((Math.random() * max) + 0); // random number between 0 and 9
	rnums[1] = Math.floor((Math.random() * max) + 0);
	rnums[2] = rnums[0] + rnums[1];
	return rnums;
}

function Fact(type) {
	this.type = type || "add";
	this.set();
}

Fact.prototype.set = function() {
	if (this.type === "ran") {
		var i = Math.floor(Math.random() * 2);
		if (i === 0) this.reset("add");
		else this.reset("sub");
	} else this.reset(this.type);
}

Fact.prototype.reset = function(type) {
	this.nums = random3();
	if ( type === "add" ) {
		this.div = $("<p>").text(this.nums[0] + "\n+" + this.nums[1]);
		this.ans = this.nums[2];
	} else if ( type === "sub" ) {
		this.div = $("<p>").text(this.nums[2] + "\n-" + this.nums[1]);
		this.ans = this.nums[0];
	} 
}

function update($div) {
	$("#fact p").replaceWith($div);
	$("#ans").val("");
}

function start() {
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
			$("#count").text(count);
			if ( count == max ) {
				$("#start").val("Start");
				stop();
				alert("YOU DID IT!");
			} else {
      f.set();
			update(f.div);			
			}
    }
	});
	T = timerToggle(T);
	$("#facts").show();
	$("#ans").focus();
}

function timerToggle(time) {
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

function stop() {
	$("#facts").hide();
	$("#fact").empty();
	T = timerToggle(T);
}
 
function main() {

	$("#start").click( function() {
		if ( $(this).val() === "Start" ) {
			$(this).val("Stop");
			start();
		} else {
			$(this).val("Start");
			stop();
		}
	});
	
}

$(document).ready(main)