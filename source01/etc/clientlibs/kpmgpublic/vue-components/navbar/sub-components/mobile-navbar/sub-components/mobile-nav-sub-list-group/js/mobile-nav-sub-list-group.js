define(['vue'], 


function MobileNavSublistGroup(Vue){
	'use strict';
	//
	var VueMobileNavSubListGroupComponent;
	//	
	VueMobileNavSubListGroupComponent = Vue.component('mobile-nav-sub-list-group',{
		template: '#mobile-nav-sub-list-group-component-template',
		props: ['vm']
	});
	//
	return VueMobileNavSubListGroupComponent;
}

);