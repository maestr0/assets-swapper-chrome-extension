/*
 * Created by Pawel Raszewski
 * raszewski@gmail.com
 * Licence GPL3
 */

// source:destination
var mapping = {
	"http://portal.aolcdn.com/p5/_v75.10/css/maing.css": "http://portal.aolcdn.com/p5/_v75.10/css/maing.orig.css"
};

chrome.webRequest.onBeforeRequest.addListener(

function(details) {
	for (var source in mapping) {
		var redirectTo = mapping[source];
		if (details.url === source) {
			console.log("MATCH found for " + source + ". Replacing url with " + redirectTo);
			return {
				redirectUrl: redirectTo
			};
		}
	}
}, {
	urls: ["<all_urls>"]
}, ["blocking"]);
