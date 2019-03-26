define(['vue'],

function (Vue){
	'use strict';
	//
	var VueNavbarTypeaheadComponent;
	//
	VueNavbarTypeaheadComponent = Vue.component('navbar-typeahead',{
		template: '#navbar-typeahead-component-template',
		methods: {
			getResponse: getResponse,
			onHit: onHit,
			onEnter: onEnter
		},
		data: dataFn
	});
	return VueNavbarTypeaheadComponent;
	// private functions
	function dataFn() {
		/*jshint validthis:true */
		var $this, url;
		//
		$this = this;
		buildUrl();
		//
		return {
			url: url,
			inputValue: '',
			termHints: []
		};
		// private functions
		function buildUrl() {
			url = $this.$store.getters['data/search/getQueryURL'];
		}
	}
	function onEnter(returnedObj) {
		/*jshint validthis:true */
		var $this, SELECTION, query;
		//
		$this = this;
		//
		query = returnedObj.evt.target.value.replace(/[#&())\*\+=\;"'<>\?\%\\/]/g, "");
		SELECTION = (returnedObj.current > -1);
		//
		if (!SELECTION) {
			goToSearchPage();
		}
		// private functions
		function goToSearchPage() {
			var href;
			//
			$this.$store.commit('data/search/SET_QUERY', query);
			href = $this.$store.getters['data/search/textQuery_HREF'];
			//
			handleUnsavedChanges(href);
		}

	}
	function onHit(selectedValue, typeahead, index) {
		/*jshint validthis:true */
		var $this;
		//
		$this = this;
		//
		if(selectedValue) {
			$this.inputValue = selectedValue;
			goToSearchPage();
		}
		//
		function goToSearchPage() {
			var href;
			//
			buildHref();
			//
			handleUnsavedChanges(href);
			function buildHref(){
				var domain, selectedItem, queryData;
				//
				domain = $this.$store.state.data.siteInfo.assetsDomain;
				selectedItem = $this.termHints[index];
				$this.$store.commit('data/search/SET_SELECTED_ITEM', selectedItem);
				//
				href = $this.$store.getters['data/search/selectedItemSearch_HREF'];
			}
		}
	}
	function handleUnsavedChanges(href) {
		if(window.location.pathname.match(/\/myinterests\.html$/)) {
			$(document).trigger('myinterestspage.search', {
				"searchUrl":href
			});
		}else if( window.kpmgPersonalize.preferenceChange) {
			$(document).trigger('communicationpreference.search', {
				"searchUrl":href
			});
		}else{
			window.location.href = href;
		}
	}
	function getResponse(response){
		/*jshint validthis:true */
		var $this, results;
		//
		$this = this;
		getResultsAndSetTermHints();
		//
		return results;
		// private functions
		function getResultsAndSetTermHints() {
			if (response.termHints && response.termHints.length) {
				var termHints;
				termHints = response.termHints;
				//
				$this.termHints = termHints;
				results = termHints.map(mapResults);
			} else {
				results = [];
				$this.termHints = [];
			}
			// private functions
			function mapResults(item) {
				return item.name;
			}
		}
	}
}

);
