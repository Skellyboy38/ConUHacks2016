chrome.browserAction.onClicked.addListener(function(tab) {
	var activeTab = tabs[0];
	chrome.tabs.sendMessage(activeTab.id, 
	{"message": "clicked_browser_action"});
});