define(['vue'],


function (Vue){
	'use strict';
	//
	var VueSiteSelectorCardComponent;
	//
	VueSiteSelectorCardComponent = Vue.component('site-selector-card',{
		template: '#site-selector-card-component-template',
		props: ['vm']
	});
	//
	return VueSiteSelectorCardComponent;
}

);
