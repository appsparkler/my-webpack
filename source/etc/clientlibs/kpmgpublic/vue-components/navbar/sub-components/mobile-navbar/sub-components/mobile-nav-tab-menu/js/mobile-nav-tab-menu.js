define(['vue'], 


function MobileNavTabMenu(Vue){
	'use strict';
	//
	var VueMobileNavTabMenuComponent;
	//	
	VueMobileNavTabMenuComponent = Vue.component('mobile-nav-tab-menu',{
		template: '#mobile-nav-tab-menu-component-template',
		props: ['vm']
	});
	//
	return VueMobileNavTabMenuComponent;
}

);