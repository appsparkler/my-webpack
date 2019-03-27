define(['vue', 'jquery', 'underscore'], 


function MobileNavSearchTabContent(Vue, $, _){
	'use strict';
	//
	var VueMobileNavSearchTabContentComponent;
	//	
	VueMobileNavSearchTabContentComponent = Vue.component('mobile-nav-search-tab-content',{
		template: '#mobile-nav-search-tab-content-component-template',
		methods: {
			search: search
		}
	});
	//
	return VueMobileNavSearchTabContentComponent;
	// private functions
	function search(evt) {
		/*jshint validthis:true*/
		var $this, returnedObject;
		//
		$this = this;
		prepareReturnedObject();
		performSearch();
		// private functions
		function performSearch() {
			var NavbarTypeAheadComponent;
			//
			NavbarTypeAheadComponent = _.find($this.$children, findNavbarTypeaheadComopnent);
			//
			NavbarTypeAheadComponent.onEnter(returnedObject);
			NavbarTypeAheadComponent.onhit(returnedObject.evt.target.value, this, this.current);
			// private functions
			function findNavbarTypeaheadComopnent(component) {
				return component.$vnode.componentOptions.tag === 'navbar-typeahead';
			}
		}
		function prepareReturnedObject() {
			var inputValue;
			//
			inputValue = $($this.$el).find('input', '.type-ahead-component').val();
			returnedObject = {};
			returnedObject.evt = {};
			returnedObject.evt.target = {};
			//
			returnedObject.evt.target.value = inputValue;
			returnedObject.current = -1;
		}
	}
}

);