FREME.registerPlugin("translate", "tilde", function(options) {

	// input validation
	var text = options.text;
	var sourceLang = options.sourceLang;
	var targetLang = options.targetLang;
	var success = options.success;
	var error = options.error;
	
	
	var required = ["text", "targetLang", "success", "clientId", "appId"];
	for( var i=0; i<required.length; i++ ){
		if( options[required[i]] == undefined ){
			console.error( FREME.INVALID_PARAMETERS );
			return FREME.INVALID_PARAMETERS;
		}
	}

	var dir = sourceLang + "-" + targetLang;
	var dirs = FREME.getPluginParameter("translate", "yandex", "translationDirections");
	var found = false;
	for (var i = 0; i < dirs.length; i++) {
		if (dirs[i] == dir) {
			found = true;
			break;
		}
	}
	if (!found) {
		console.error(FREME.INVALID_PARAMETERS);
		return FREME.INVALID_PARAMETERS;
	}
	
	// input validation passed

	if ( typeof (Tilde) === 'undefined')
		Tilde = {};
	Tilde.eTranslate = function(text, sourceLang, targetLang, success, error) {
		Tilde.Translator.getSystem(sourceLang, targetLang, function(system) {
			if (system === undefined) {
				error("Translation not started", "No system available for selected language pair");
			} else {
				Tilde.Translator.translate(text, system, success, error);
			};
		}, error);
	};

	Tilde.Translator = {};

	Tilde.Translator.clientid = options.clientId;
	Tilde.Translator.appid = options.appId;
	Tilde.Translator.url = 'https://letsmt.eu/ws/Service.svc/json/';
	Tilde.Translator.systems = [];

	Tilde.Translator.getSystem = function(sourceLang, targetLang, callback, error) {
		if (Tilde.Translator.systems.length == 0) {
			$.ajax({
				type : 'GET',
				dataType : 'json',
				url : Tilde.Translator.url + 'GetSystemList',
				data : {
					appid : Tilde.Translator.appid
				},
				cache : false,
				headers : {
					'client-id' : Tilde.Translator.clientid
				}
			}).done(function(data) {
				$.each(data.System, function(idx, sys) {
					var status = Tilde.Translator.getSystemMetaValue(sys.Metadata, 'status');
					if (status === 'running') {
						Tilde.Translator.systems.push(sys);
					}
				});
				callback(Tilde.Translator.filteredSystem(sourceLang, targetLang));
			}).fail(function(ex) {
				error(ex.statusText, ex.responseText);
			});
		} else {
			callback(Tilde.Translator.filteredSystem(sourceLang, targetLang));
		}
	};

	Tilde.Translator.filteredSystem = function(sourceLang, targetLang) {
		var filteredSystems = [];
		$.each(Tilde.Translator.systems, function(idx, sys) {
			if (sys.SourceLanguage.Code === sourceLang && sys.TargetLanguage.Code === targetLang) {
				filteredSystems.push(sys);
			}
		});

		console.log(filteredSystems[0]);
		return filteredSystems[0];
	};

	Tilde.Translator.getSystemMetaValue = function(array, key) {
		if (array === undefined) {
			return false;
		}

		var value = null;

		$.each(array, function(idx, item) {

			if (item.Key === key) {
				value = item.Value;
				return false;
				//breaks the loop
			}
		});

		return value;
	};

	Tilde.Translator.translate = function(text, system, success, error) {
		$.ajax({
			type : 'GET',
			dataType : 'json',
			url : Tilde.Translator.url + 'Translate',
			data : {
				appid : Tilde.Translator.appid,
				systemid : system.ID,
				text : text
			},
			cache : false,
			headers : {
				'client-id' : Tilde.Translator.clientid
			}
		}).done(function(data) {
			success(data);
		}).fail(function(ex) {
			error(ex.statusText, ex.responseText);
		});
	};

	Tilde.eTranslate(text, sourceLang, targetLang, success, error);
});

FREME.addPluginParameter("translate", "tilde", "translationDirections", ["de-en", "en-de"]);

