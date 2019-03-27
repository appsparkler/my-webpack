define(['jquery'], 

function($) {
	var searchModule;
	//
	prepareSearchModule();
	//
	setServerDataOnState();
	setAdditionalFieldsOnState();
	//
	setGetterOnSearchModule();
	//
	setMutationsONSearchModule();
	//
	return searchModule;
	// private functions
	function setMutationsONSearchModule() {
		searchModule.mutations = {
			'SET_SELECTED_ITEM': SET_SELECTED_ITEM,
			'SET_QUERY': SET_QUERY
		};
		// private functions
		function SET_QUERY(state, query) {
			state.query = query;
		}
		function SET_SELECTED_ITEM(state, item) {
			state.selectedItem = item;
		}
	}
	function setGetterOnSearchModule() {
		searchModule.getters = getters = {
			getQueryURL: getQueryURL,
			selectedItemSearch_HREF: selectedItemSearch_HREF,
			textQuery_HREF: textQuery_HREF,
			domain: domain
		};
		// private functions
		function textQuery_HREF(state, getters, rootState) {
			var HREF;
			//
			buildHREF();
			//
			return HREF;
			//private functions
			function buildHREF() {
				var queryData, queryString;
				//
				queryData = {
					sp_p: "any"
				};
                if(state.query) {
                    queryData.q = state.query;
                }
				queryString = $.param(queryData);
				//
				HREF = getters.domain
					+ state.serverData.config.searchResultsPath 
					+ '?'
					+ queryString;
			}
		}
		function getQueryURL(state, getters, rootState) {
			var url;
			//
			buildUrl();
			//
			return url;
			//
			function buildUrl() {
				var domain, queryString;
				//
				domain = getters.domain;
				queryString = $.param(state.serverData.queryParams.typeahead);
				//
				url = domain + '/ses?term_prefix=:keyword&' + queryString;
			}
        }
	
		function selectedItemSearch_HREF(state, getters, rootState) {
			var HREF;
			//
			buildHREF();
			//
			return HREF;
			// private function
			function buildHREF() {
				var selectedItem, queryData, queryString;
				//
				selectedItem = state.selectedItem;
				//
				queryData = {
					sp_p: "any",
					q: selectedItem.name + " " + selectedItem.id,
					SES: selectedItem.id
				};
				queryString = $.param(queryData);
				//
				HREF = getters.domain 
					+ state.serverData.config.searchResultsPath 
					+ '?'
					+ queryString;
				
			}
		}
	
		function domain(state, getters, rootState) {
			return rootState.data.siteInfo.origin;
		}	
	}
	function setServerDataOnState() {
		var serverData;
		//
		serverData = $('#navigation-v2-data-search').data('serverData');
		//
		searchModule.state.serverData = serverData;
	}
	function setAdditionalFieldsOnState() {
		searchModule.state.selectedItem = {};
		searchModule.state.query = "";
	}
	function prepareSearchModule() {
		searchModule = {
			namespaced:true,
			state: {},
			mutations:{},
			actions:{},
			getters: {}
		};
	}
});