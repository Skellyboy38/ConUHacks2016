// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      //var firstHref = $("a[href^='http']").eq(0).attr("href");
		var firstHref = "https://google.com";
      console.log(firstHref);

      // This line is new!
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
	else if( request.message === "loaded_page" ) {
		extractAudio();
	}
  }
);

function extractAudio() {
	alert("The page loaded!");
}