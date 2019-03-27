define([
	'jquery',	
    'vue'
],

function MobileNavSlideMenu($, Vue){
	'use strict';
	//
	var VueMobileNavSlideMenuComponent;	
	//	
	VueMobileNavSlideMenuComponent = Vue.component('mobile-nav-slide-menu',{
		template: '#mobile-nav-slide-menu-component-template',
        props: ['vm']
	});

	return VueMobileNavSlideMenuComponent;
   
}
);

