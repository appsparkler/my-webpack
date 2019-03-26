define(['vue'], 


function MobileNavUserProfileTabContent(Vue){
	'use strict';
	//
	var VueMobileNavUserProfileTabContentComponent;
	//	
	VueMobileNavUserProfileTabContentComponent = Vue.component('mobile-nav-user-profile-tab-content',{
		template: '#mobile-nav-user-profile-tab-content-component-template',
		props: ['vm']
	});
	//
	return VueMobileNavUserProfileTabContentComponent;
}

);