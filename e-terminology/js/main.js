if (typeof(Tilde) === 'undefined') Tilde = {};

Tilde.eTerminology = function(text, sourceLang, targetLang, domain, success, error) {
  Tilde.Terminology.lookup(text, sourceLang, targetLang, domain, success, error);
};

Tilde.Terminology = {};
Tilde.Terminology.clientid = 'RlJFTUU6dXxGcjNtM19zJGN1ciQ=';
Tilde.Terminology.url = 'https://api.taas-project.eu/extraction/demo?';

Tilde.Terminology.lookup = function(text, sourceLang, targetLang, domain, success, error) {
  $.ajax({
      type: 'POST',
      url: Tilde.Terminology.url + 'sourceLang=' + sourceLang + '&targetLang=' + targetLang + '&domain=' + domain,
      data: text,
      cache: false,
      headers: {
        'content-type': 'text/plain',
        'Authorization': 'basic ' + Tilde.Terminology.clientid,
        'TaaS-User-Key': ''
      }
    })
    .done(function(result) {
      success(result);
    })
    .fail(function(data) {
      console.log("error in terminology");
      error(data);
    });
}

function submit() {
  var e = document.getElementById("toLanguage");
  var lang = e.options[e.selectedIndex].value;

  Tilde.eTerminology(
    $('#text').val(),
    'en',
    lang,
    '',
    function(result) {
      $("#terminologyText-its").val(result.its);
      $("#terminologyText-tbx").val(result.tdx);
    },
    function(ex) {
      console.log(ex.responseText);
    }
  );
}

function reset() {
  $("#text").val("");
  $("#terminologyText-its").val("");
  $("#terminologyText-tbx").val("");
}
