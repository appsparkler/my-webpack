define(['vue'], 


function MobileNavTabCollapseTriggers(Vue){
	'use strict';
	//
	var VueMobileNavTabCollapseTriggers;
	//	
	VueMobileNavTabCollapseTriggers = Vue.component('mobile-nav-tab-collapse-triggers',{
		template: '#mobile-nav-tab-collapse-triggers-component-template',
		props: ['vm']
	});
	//
	return VueMobileNavTabCollapseTriggers;
}
);