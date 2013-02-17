$("script").each(function() {
	if ($(this).attr("src")) {
		$(this).attr("src", "replaced");
	}
});
