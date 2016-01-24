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
	
	visitLink(firstLink, 0);
}
//======================================================================================================
function visitLink(link, maximum) {

	var links = [];
	var elementToCheck = breadthPath.shift();	
	var toCheck = elementToCheck[0].toLowerCase();
	
	if(toCheck == second.toLowerCase()) {
		finish(elementToCheck);
		return;
	}
	else if(maximum >= 10) {
		finish(elementToCheck);
		return;
	}
	else {
		/*
		$.ajaxPrefilter( function (options) {
			if (options.crossDomain && jQuery.support.cors) {
				var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
				options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
			}
		});
	
		$.get(link, function(response) {
			var links = $(response).find('#mw-content-text p a.mw-redirect');
			links.each(function(key, value) {
				var linkHref = 'https://en.wikipedia.org/' + $(value)[0].href.substring(8);
				var title = $(value)[0].outerText;
				title = title.split(' ').join('_');
				links.push(title);
			});
		});*/
		
		var response = httpGet(link);
		var doc = document.createElement('html');
		doc.innerHTML = response;
		var pTags = doc.getElementsByTagName("p");
		
		var number = 0;
		for(var i = 0; i < pTags.length; i++) {
			var aTags = pTags[i].getElementsByTagName("a");
			for(var j = 0; j < aTags.length; j++) {
				var word = aTags[j].innerHTML;
				if(word.charAt(0) != '<') {
					word = word.split(' ').join('_');
					links.push(word);	
					number++;
				}
				if(number >= 50) {
					break;
				}		
			}
		}
		/*
		var information = doc.getElementById("mw-content-text");
		var pTags = information.getElementsByTagName("p");
		for(var i = 0; i < pTags.length; i++) {
			console.log(pTags[i].getElementsByTagName("a"));
		}*/
		
		/*
		for(var i = 0; i < links.length; i++) {
			var temp = elementToCheck;
			temp.unshift(links[i]);
			breadthPath.push(temp);
		}
		
		console.log(breadthPath);
		visitLink(wikipediaLink + breadthPath[0][0], maximum++);*/
	}
}

function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", theUrl, false ); 
	xmlHttp.send( null );
	return xmlHttp.responseText;
}

function finish(array) {
	var path = "";
	for(var word in array) {
		path += (word + "\n");
	}
	alert(path);
}
