define(['vue'], 


function MobileNavLanguageLocaleTabComponent(Vue){
	'use strict';
	//
	var VueMobileNavLanguageLocaleTabComponent;
	//	
	VueMobileNavLanguageLocaleTabComponent = Vue.component('mobile-nav-language-locale-tab-content',{
		template: '#mobile-nav-language-locale-tab-content-component-template',
		props: ['vm']
	});
	//
	return VueMobileNavLanguageLocaleTabComponent;
}

);