var source = $("#source");
var target = $("#target");
var table = $("table");
// on install
if (typeof localStorage.configuration === "undefined") {
	localStorage.configuration = "{}";
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

table.on("click", ".changeStatus", function() {
	var status = $(this).is(":checked");
	$(this).parent().find("span").text(status ? "Active" : "Disabled").toggleClass("label-success label-important");
	var src = $(this).parent().parent().parent().find("a.source").attr("href");
	configuration[src].status = status;
	localStorage.configuration = JSON.stringify(configuration);
});

var fnAddEntry = function() {
		configuration[source.val()] = {
			url: target.val(),
			status: true
		};
		localStorage.configuration = JSON.stringify(configuration);
		addRow(source.val(), target.val(), true);
	};

var addRow = function(source, target, status) {
		var newRow = $("<tr>").append($("<td>").append($("<a>", {
			"href": source,
			"text": source,
			"class": "source"
		}))).append($("<td>").append($("<a>", {
			"href": target,
			"text": target
		}))).append($("<td>").append($("<label>", {
			"class": "checkbox"
		}).append($("<span>", {
			"class": "label " + (status ? "label-success" : "label-important"),
			"text": status ? "Active" : "Disabled"
		})).append($("<input>", {
			type: "checkbox",
			"class": "changeStatus"
		})))).append($("<td>").append($("<a>", {
			"class": "btn btn-danger btn-mini removeEntry"
		}).append(
		$("<i>", {
			"class": "icon-remove-sign icon-white"
		})).append(" Remove")));
		newRow.find("input[type=checkbox]").prop('checked', status);
		table.find("tbody ").append(newRow);
	};

var init = function() {
		for (var source in configuration) {
			addRow(source, configuration[source].url, configuration[source].status);
		}
	};

init();
