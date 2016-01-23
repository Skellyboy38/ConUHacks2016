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

var aTags = [];
var first = "";
var second = "";
var wikipediaLink = "https://en.wikipedia.org/wiki/";

function parseValue(value) {
	var words = value.split(" ");
	first = words[0];
	second = words[1];
	var firstLink = wikipediaLink + first;
	
	visitLink(firstLink);
}

function visitLink(link) {
	window.location.href = link;
	
	analyzeLink(link);
}

function analyzeLink(link) {
	if(link.search(second) != -1) {
		finish()
		return null;
	}
	var content = document.getElementById("mw-content-text");
	var pTags = content.getElementsByTagName("p");
	for each(p in pTags) {
		var links = p.getElementsByTagName("a");
		for each(a in links) {
			var href = a.href;
			var word = href.substr(6, href.length);
			aTags.push(a);
		}
	}
}

function finish() {
}
