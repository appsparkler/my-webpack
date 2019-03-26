define([
	'vue',
	//
	'vue-components/navbar/sub-components/desktop-navbar/sub-components/navbar-nav/js/navbar-nav',

	'vue-components/navbar/sub-components/desktop-navbar/sub-components/navbar-ikon-menu/js/navbar-ikon-menu',

	'vue-components/navbar/sub-components/desktop-navbar/sub-components/navbar-nav-list-item/js/navbar-nav-list-item',
	'vue-components/navbar/sub-components/desktop-navbar/sub-components/ikon-trigger-with-navflyout-dropdown/js/ikon-trigger-with-navflyout-dropdown',
	'vue-components/navbar/sub-components/desktop-navbar/sub-components/ikon-trigger-with-animated-search-bar/js/ikon-trigger-with-animated-search-bar',
	'vue-components/navbar/sub-components/desktop-navbar/sub-components/nav-flyout-fullbleed/js/nav-flyout-fullbleed',
	'vue-components/navbar/sub-components/desktop-navbar/sub-components/animated-search-bar/js/animated-search-bar',

	'vue-components/navbar/sub-components/desktop-navbar/sub-components/nav-flyout-cell/js/nav-flyout-cell',

	'vue-components/navbar/sub-components/desktop-navbar/sub-components/card-link/js/card-link',

	'vue-components/navbar/sub-components/desktop-navbar/sub-components/promotional/js/promotional',

	'vue-components/navbar/sub-components/desktop-navbar/sub-components/nav-list/js/nav-list',

	'vue-components/navbar/sub-components/desktop-navbar/sub-components/site-selector-list/js/site-selector-list',

	'vue-components/navbar/sub-components/desktop-navbar/sub-components/interest-summary/js/interest-summary',

	'vue-components/navbar/sub-components/desktop-navbar/sub-components/site-selector-card/js/site-selector-card'
], function(Vue){
    'use strict';
    var VueDesktopNavbar;
    //
    VueDesktopNavbar = Vue.component('desktop-navbar', {
        template:'#desktop-navbar-component-template',
        props: ['vm']
    });
    //
    return VueDesktopNavbar;
});
