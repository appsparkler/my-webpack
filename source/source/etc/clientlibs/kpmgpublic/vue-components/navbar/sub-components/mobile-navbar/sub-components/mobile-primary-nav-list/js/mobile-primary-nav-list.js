define(['vue'], 


function MobilePrimaryNavList(Vue){
	'use strict';
	//
	var VueMobilePrimaryNavList;

	//	
	VueMobilePrimaryNavList = Vue.component('mobile-primary-nav-list',{
		template: '#mobile-primary-nav-list-component-template',
		props: ['vm']
	});
	//
	return VueMobilePrimaryNavList;
}

);