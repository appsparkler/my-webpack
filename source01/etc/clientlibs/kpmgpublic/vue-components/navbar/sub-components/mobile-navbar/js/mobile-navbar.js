define([
	'vue',
	
	/*'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-secondary-nav-list/js/mobile-secondary-nav-list',*/
	
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-primary-nav-list/js/mobile-primary-nav-list',
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-collapse-trigger/js/mobile-nav-collapse-trigger',
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-sub-list-group/js/mobile-nav-sub-list-group',
	
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/collapse-cancel-trigger/js/collapse-cancel-trigger',
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-language-locale-tab-content/js/mobile-nav-language-locale-tab-content',
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-search-tab-content/js/mobile-nav-search-tab-content',
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-user-profile-tab-content/js/mobile-nav-user-profile-tab-content',
	
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-tab/js/mobile-nav-tab',
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-tab-collapse-triggers/js/mobile-nav-tab-collapse-triggers',
	
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-tab-menu/js/mobile-nav-tab-menu',
	
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-menu-tabs/js/mobile-nav-menu-tabs',
	
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-nav-slide-menu/js/mobile-nav-slide-menu',
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-slide-menu-toggle-trigger/js/mobile-slide-menu-toggle-trigger',
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/mobile-menu-toggle-and-menu/js/mobile-menu-toggle-and-menu',
	
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/sub-list-item/js/sub-list-item',
	
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/link-label-with-chevron/js/link-label-with-chevron',
	
	'vue-components/navbar/sub-components/mobile-navbar/sub-components/radio-label/js/radio-label'
			
], function(Vue){
    'use strict';
    var VueMobileNavbar;
    //
    VueMobileNavbar = Vue.component('mobile-navbar', {
        template:'#mobile-navbar-component-template',
        props: ['vm']
    });
    //
    return VueMobileNavbar;
});