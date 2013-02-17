var source = $("#source");
var target = $("#target");
var table = $("table");

$("#add_asset").click(function() {
	fnAddEntry();
	target.val("");
	source.val("");
});

table.on("click", ".removeEntry", function() {
	var src = $(this).parent().parent().find("a.source").attr("href");
	delete localStorage[src];
	$(this).parent().parent().hide(500).remove();
});

var fnAddEntry = function() {
		localStorage[source.val()] = target.val();
		var newRow = $("<tr>").append($("<td>").append($("<a>", {
			"href": source.val(),
			"text": source.val(),
			"class": "source"
		}))).append($("<td>").append($("<a>", {
			"href": target.val(),
			"text": target.val()
		}))).append($("<td>", {
			text: "status"
		})).append($("<td>").append($("<a>", {
			"class": "btn btn-danger removeEntry"
		}).append(
		$("<i>", {
			"class": "icon-remove-sign icon-white"
		})).append(" Remove"))

		);

		table.find("tbody ").append(newRow);
	};

var removeEntry = function() {

	};
