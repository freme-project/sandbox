var FREME = {

	plugins : {
		"i18n" : {},
		"link" : {},
		"entity" : {},
		"terminology" : {},
		"translate" : {},
		"publish" : {}
	},

	pluginParameter : {},

	// return codes for functions
	INVALID_PARAMETERS : "INVALID PARAMETERS",
	NOT_IMPLEMENTED : "NOT IMPLEMENTED",
	ALL_OK : "ALL OK",

	registerPlugin : function(service, plugin, callback) {
		if (this.plugins[service] == undefined) {
			console.error(this.NOT_IMPLEMENTED);
			return this.NOT_IMPLEMENTED;
		} else {
			this.plugins[service][plugin] = callback;
		}
	},

	addPluginParameter : function(service, plugin, parameterName, parameterValue) {
		if (this.pluginParameter[service] == undefined) {
			this.pluginParameter[service] = {};
		}
		if (this.pluginParameter[service][plugin] == undefined) {
			this.pluginParameter[service][plugin] = {};
		}
		this.pluginParameter[service][plugin][parameterName] = parameterValue;
	},

	getPluginParameter : function(service, plugin, parameter) {
		if (this.pluginParameter[service] == undefined || this.pluginParameter[service][plugin] == undefined || this.pluginParameter[service][plugin][parameter] == undefined) {
			return this.NOT_IMPLEMENTED;
		} else {
			return this.pluginParameter[service][plugin][parameter];
		}
	},

	_executePlugin : function(service, plugin, options) {
		if (this.plugins[service] == undefined || this.plugins[service][plugin] == undefined) {
			return this.NOT_IMPLEMENTED;
		} else {
			return this.plugins[service][plugin](options);
		}
	},

	translate : function(plugin, options) {
		this._executePlugin("translate", plugin, options);
	},

	link : function(provider, options) {
		this._executePlugin("link", plugin, options);
	},

	i18n : function(plugin, options) {
		this._executePlugin("i18n", plugin, options);
	},

	entity : function(plugin, options) {
		this._executePlugin("entity", plugin, options);
	},

	terminology : function(plugin, options) {
		this._executePlugin("terminology", plugin, options);
	},

	publish : function(plugin, options) {
		this._executePlugin("publish", plugin, options);
	},
};
