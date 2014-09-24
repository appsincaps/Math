"use strict";

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
	
	if (this.type === "add") {
		this.ans = 2;
	} else if ( this.type === "sub" ) {
		this.ans = 0;
	}
	this.reset();
}

Fact.prototype.reset = function() {
	this.nums = random3();
	if ( this.type === "add" ) {
		this.div = $("<p>").text(this.nums[0] + "\n+" + this.nums[1]);
	} else if ( this.type === "sub" ) {
		this.div = $("<p>").text(this.nums[2] + "\n-" + this.nums[1]);
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
    if (e.which == 13 && $(this).val() == f.nums[f.ans]) {
			count++;
			$("#count").text(count);
			if ( count == max ) {
				$("#start").val("Start");
				stop();
				alert("YOU DID IT!");
			} else {
      f.reset();
			update(f.div);			
			}
    }
	});
	$("#facts").show();
	$("#ans").focus();
}

function stop() {
	$("#facts").hide();
	$("#fact").empty();
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