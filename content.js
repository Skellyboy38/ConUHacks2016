// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		var value = prompt("Enter two words separated by a space: ", "");
		while(value.split(" ").length != 2) {
			value = prompt("Enter two words: ", "");
		}
		parseValue(value);
    }
  }
);

var check = true;
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
	
	visitLink(firstLink, 0);
}
//======================================================================================================
function visitLink(link, maximum) {

	var links = [];
	var elementToCheck = breadthPath.shift();	
	var toCheck = elementToCheck[0].toLowerCase();
	
	if(toCheck == second.toLowerCase()) {
		check = false;
		finish(elementToCheck);
		breadthPath = [];
		return;
	}
	else if(maximum >= 1000 && check) {
		finish(elementToCheck);
		breadthPath = [];
		return;
	}
	else {
		var response = httpGet(link);
		if(response != "") {
			var doc = document.createElement('html');
			doc.innerHTML = response;
			var pTags = doc.getElementsByTagName("p");
		
			var number = 0;
			for(var i = 0; i < pTags.length; i++) {
				var aTags = pTags[i].getElementsByTagName("a");
				for(var j = 0; j < aTags.length; j++) {
					var word = aTags[j].innerHTML;
					if(word.charAt(0) == '<') {
					}
					else {
						var words = word.split(' ');
						if(words.length > 2) {
						}
						else {
							word = words.join('_');
							links.push(word);	
							number++;
						}
					}
					if(number >= 50) {
						break;
					}		
				}
			}
		
			for(var i = 0; i < links.length; i++) {
				var tempArray = [];
				for(var j = 0; j < elementToCheck.length; j++) {
					tempArray.push(elementToCheck[j]);
				}
				tempArray.unshift(links[i]);
				breadthPath.push(tempArray);
			}
			visitLink(wikipediaLink + breadthPath[0][0], maximum + 1);
		}
		else {
			visitLink(wikipediaLink + breadthPath[0][0], maximum + 1);
		}
		
	}
}

function httpGet(theUrl) {
	try {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", theUrl, false ); 
		xmlHttp.send( null );
		return xmlHttp.responseText;
	}
	catch(err) {
		return "";
	}
}

function finish(array) {
	var path = "";
	for(var i = array.length -1; i >= 0; i--) {
		path += (array[i] + "\n");
	}
	alert(path);
}
