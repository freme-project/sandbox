function spotlight(input, cb) {
  $.get(
    "http://spotlight.nlp2rdf.aksw.org/spotlight?f=text&i=" + input + "&t=direct&confidence=0.3", cb);
}

function classifier(input, cb) {
  $.post(
    "http://entityclassifier.eu/thd/api/v2/extraction?apikey=87d112f06fc84b1bb4105df65a304f2a&format=json&entity_type=ne",
    input, cb
  );
}

function submit() {
	var input = $('#text').val();
	cb = function(data) {
		$("#result").val(JSON.stringify(data));
	};

	if ($("input[name=action]:checked").val() === "ec") {
		classifier(input, cb); 
	} else {
		spotlight(input, cb);
	}
}

function reset() {
  $('#text').val("");
  $('#result').val("");
}
