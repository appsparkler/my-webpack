define(['vue'], 


function MobileNavMenuTabs(Vue){
	'use strict';
	//
	var VueMobileNavMenuTabsComponent;
	//	
	VueMobileNavMenuTabsComponent = Vue.component('mobile-nav-menu-tabs',{
		template: '#mobile-nav-menu-tabs-component-template',
		props: ['vm'],
		mounted: mobileGlobeCallback
	});
	//
	function mobileGlobeCallback(){
		/*jshint validthis:true */
		//Site selector menu and main menu toggle feature
		var mobileGlobe = $('.mobile-nav-menu-tabs-component');
		mobileGlobe.on('click',function(){ 
			var mainNav = $(this).parent();
			mainNav.toggleClass("open"); 
			if(mainNav.hasClass("open")){
				mainNav.find("li.mobile-primary-nav-list-component").slideUp();
				mainNav.find("li.siteSelectorli").slideUp();
			}else{
				mainNav.find("li.mobile-primary-nav-list-component").slideDown(); 
				mainNav.find("li.siteSelectorli").slideDown();
			}	
		});
	}
	//
	return VueMobileNavMenuTabsComponent;
}

);