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
	if(elementToCheck[elementToCheck.length - 1].equalsIgnoreCase(second)) {
		finish(elementToCheck);
		return;
	}
	else {
		var content = document.getElementById("mw-content-text");
		var pTags = content.getElementsByTagName("p");
		for each(p in breadthPath) {
			var links = p.getElementsByTagName("a");
			for each(a in links) {
				var href = a.href;
				var word = href.substr(6, href.length);	
				
				elementToCheck.push(word);
				breadthPath.push(elementToCheck);
				
			}
		}
		visitLink(wikipediaLink + breadthPath[0][0]);
	}
}

function finish(array) {
	var path = "";
	for each(word in array) {
		path += (word + "\n");
	}
	alert(path);
}
