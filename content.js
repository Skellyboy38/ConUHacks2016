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

function parseValue(value) {
	var words = value.split(" ");
	var first = words[0];
	var second = words[1];
	alert(first + "    " + second);
}
