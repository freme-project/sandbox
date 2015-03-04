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
  var cb_ec = function(data) {
    $("#result").val(JSON.stringify(data));
    convertECtoTable(data);
  };

  var cb = function(data) {
    $("#result").val(JSON.stringify(data));
  }


  if ($("input[name=action]:checked").val() === "ec") {
    classifier(input, cb_ec);
  } else {
    spotlight(input, cb);
  }
}

function reset() {
  $('#text').val("");
  $('#result').val("");
  $('#resultTable').html(" <p>Table with results will be shown here.</p>");
}

function convertECtoTable(data) {
  $table = $("<table></table>");
  $header = $("<tr><th>Word</th><th>Entity</th><th>Type</th></tr>");
  $table.append($header);


  for (i in data) {
    var d = data[i];
    var word = d.underlyingString;
    var types = d.types;

    for (j in types) {
      $row = $("<tr></tr>");
      $row.append("<td>" + word + "</td>");
      var type = types[j];
      var typeURI = type.typeURI;
	  var typeLabel = type.typeLabel;
      var entityURI = type.entityURI;
      var entityLabel = type.entityLabel;
      $row.append("<td><a target=\"_blank\" href=\"" + entityURI + "\">" + entityLabel + "</td>");
      $row.append("<td><a target=\"_blank\" href=\"" + typeURI + "\">" + typeLabel + "</td>");
      $table.append($row);
    }

    $table.append($row);
  }

  $('#resultTable').empty();
  $('#resultTable').append($table);
  console.log($table);
}
