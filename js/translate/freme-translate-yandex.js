FREME.registerPlugin("translate", "yandex", function(options) {

	// input validation
	
	var text = options.text;
	var sourceLang = options.sourceLang;
	var targetLang = options.targetLang;	
	var success = options.success;
	var error = options.error;
	var apiKey = options.apiKey;

	var required = ["text", "sourceLang", "targetLang", "success", "apiKey"];
	for( var i=0; i<required.length; i++ ){
		if( options[required[i]] == undefined ){
			console.error( FREME.INVALID_PARAMETERS );
			return FREME.INVALID_PARAMETERS;
		}
	}
	
	var dir = sourceLang + "-" + targetLang;
	var dirs = FREME.getPluginParameter("translate", "yandex", "translationDirections");
	var found = false;
	for( var i=0; i<dirs.length; i++ ){
		if( dirs[i] == dir ){
			found = true;
			break;
		}
	}
	if( !found ){
		console.error( FREME.INVALID_PARAMETERS );
		return FREME.INVALID_PARAMETERS;
	}
	
	// validation passed - do ajax call
	
	var data = {
		text : text,
		key : apiKey,
		lang : sourceLang + "-" + targetLang
	};

	$.ajax({
		url : "https://translate.yandex.net/api/v1.5/tr.json/translate",
		data : data,
		jsonp : "callback",
		dataType : "jsonp",
		success : function(msg){
			success(msg.text);
		},
		error : error
	});
});

FREME.addPluginParameter("translate", "yandex", "translationDirections", ["az-ru","be-bg","be-cs","be-de","be-en","be-es","be-fr","be-it","be-pl","be-ro","be-ru","be-sr","be-tr","bg-be","bg-ru","bg-uk","ca-en","ca-ru","cs-be","cs-en","cs-ru","cs-uk","da-en","da-ru","de-be","de-en","de-es","de-fr","de-it","de-ru","de-tr","de-uk","el-en","el-ru","en-be","en-ca","en-cs","en-da","en-de","en-el","en-es","en-et","en-fi","en-fr","en-hu","en-it","en-lt","en-lv","en-mk","en-nl","en-no","en-pt","en-ru","en-sk","en-sl","en-sq","en-sv","en-tr","en-uk","es-be","es-de","es-en","es-ru","es-uk","et-en","et-ru","fi-en","fi-ru","fr-be","fr-de","fr-en","fr-ru","fr-uk","hr-ru","hu-en","hu-ru","hy-ru","it-be","it-de","it-en","it-ru","it-uk","lt-en","lt-ru","lv-en","lv-ru","mk-en","mk-ru","nl-en","nl-ru","no-en","no-ru","pl-be","pl-ru","pl-uk","pt-en","pt-ru","ro-be","ro-ru","ro-uk","ru-az","ru-be","ru-bg","ru-ca","ru-cs","ru-da","ru-de","ru-el","ru-en","ru-es","ru-et","ru-fi","ru-fr","ru-hr","ru-hu","ru-hy","ru-it","ru-lt","ru-lv","ru-mk","ru-nl","ru-no","ru-pl","ru-pt","ru-ro","ru-sk","ru-sl","ru-sq","ru-sr","ru-sv","ru-tr","ru-uk","sk-en","sk-ru","sl-en","sl-ru","sq-en","sq-ru","sr-be","sr-ru","sr-uk","sv-en","sv-ru","tr-be","tr-de","tr-en","tr-ru","tr-uk","uk-bg","uk-cs","uk-de","uk-en","uk-es","uk-fr","uk-it","uk-pl","uk-ro","uk-ru","uk-sr","uk-tr"] );
