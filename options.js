var source = $("#source");
var target = $("#target");
var table = $("table");
// on install
if (typeof localStorage.configuration === "undefined") {
	localStorage.configuration = "";
}
var configuration = JSON.parse(localStorage.configuration);

$("#add_asset").click(function() {
	fnAddEntry();
	target.val("");
	source.val("");
});

table.on("click", ".removeEntry", function() {
	var src = $(this).parent().parent().find("a.source").attr("href");
	delete configuration[src];
	localStorage.configuration = JSON.stringify(configuration);
	$(this).parent().parent().hide(500).remove();
});

var fnAddEntry = function() {
		configuration[source.val()] = target.val();
		localStorage.configuration = JSON.stringify(configuration);
		addRow(source.val(),target.val());
	};

var addRow = function(source,target){
	var newRow = $("<tr>").append($("<td>").append($("<a>", {
			"href": source,
			"text": source,
			"class": "source"
		}))).append($("<td>").append($("<a>", {
			"href": target,
			"text": target
		}))).append($("<td>", {
			text: "status"
		})).append($("<td>").append($("<a>", {
			"class": "btn btn-danger removeEntry"
		}).append(
		$("<i>", {
			"class": "icon-remove-sign icon-white"
		})).append(" Remove")));

		table.find("tbody ").append(newRow);
};

var load = function() {
		for (var source in configuration) {
			addRow(source, configuration[source]);
		}
	};

load();