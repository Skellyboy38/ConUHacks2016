// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		var value = prompt("Enter two words: ", "");
		while(value.split(" ").length != 2) {
			value = prompt("Enter two words: ", "");
		}
		parseValue(value);
    }
  }
);

var breadthPath = [];
var first = "";
var second = "";
var wikipediaLink = "https://en.wikipedia.org/wiki/";

function parseValue(value) {
	var words = value.split(" ");
	first = words[0];
	second = words[1];
	var firstLink = wikipediaLink + first;
	
	breadthPath.push([first]);
	
	visitLink(firstLink);
}
//======================================================================================================
function visitLink(link) {
	window.location.href = link;

	var elementToCheck = breadthPath.shift();	
	var toCheck = elementToCheck[elementToCheck.length -1].toLowerCase();
	
	if(toCheck == second.toLowerCase()) {
		finish(elementToCheck);
		return;
	}
	else {
		var content = document.getElementById("mw-content-text");
		var aTags = content.getElementsByTagName("a");
		for(var i = 0; i < aTags.length; i++) {
			var a = aTags[i];
			var href = a.getAttribute('href');
			var word = href.substr(6, href.length);	
			console.log(word);
			elementToCheck.push(word);
			breadthPath.push(elementToCheck);
		}	
		visitLink(wikipediaLink + breadthPath[0][0]);
	}
}

function finish(array) {
	var path = "";
	for(var word in array) {
		path += (word + "\n");
	}
	alert(path);
}
