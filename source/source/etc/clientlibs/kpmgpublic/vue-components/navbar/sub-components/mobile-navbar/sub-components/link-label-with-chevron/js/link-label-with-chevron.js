define(['vue'], 

function (Vue){
	'use strict';
	//
	var VueLinkLabelWithChevronComponent;
	//	
	VueLinkLabelWithChevronComponent = Vue.component('link-label-with-chevron', {
		template: '#link-label-with-chevron-component-template',
		props: ['vm', 'classes']
	});
	//
	return VueLinkLabelWithChevronComponent;
}

);