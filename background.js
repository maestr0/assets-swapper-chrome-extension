/*
 * Created by Pawel Raszewski
 * raszewski@gmail.com
 * Licence GPL3
 */

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version'];
if (currVersion != prevVersion) {
	// Check if we just installed this extension.
	if (typeof prevVersion == 'undefined') {
		onInstall();
	} else {
		//onUpdate(prevVersion);
	}
	localStorage['version'] = currVersion;
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	// source:destination
	var mapping = JSON.parse(localStorage.configuration);
	for (var source in mapping) {
		var redirectTo = mapping[source];
		if (redirectTo.status && details.url === source) {
			console.log("MATCH found for " + source + ". Replacing url with " + redirectTo.url);
			var icon = 'assets_swapper_icon_48.png';
			chrome.pageAction.setIcon({
				path: icon,
				tabId: details.tabId
			});
			chrome.pageAction.show(details.tabId);
			return {
				redirectUrl: redirectTo.url
			};
		}
	}
}, {
	urls: ["<all_urls>"]
}, ["blocking"]);

chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({url: 'options.html'});
});

function onInstall() {
	// on install
	if (typeof localStorage.configuration === "undefined") {
		localStorage.configuration = "{}";
	}
}

function getVersion() {
	var details = chrome.app.getDetails();
	return details.version;
}
