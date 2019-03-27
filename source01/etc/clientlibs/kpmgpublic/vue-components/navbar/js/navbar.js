define([
	'vue',
	// LEGACY COMPONENTS
	'vue-components/navbar/sub-components/legacy/js/legacy',
	// SHARED COMPONENTS
	'vue-components/navbar/sub-components/shared/js/shared',
	// DESKTOP NAVBAR
	'vue-components/navbar/sub-components/desktop-navbar/js/desktop-navbar',
	// MOBILE NAVBAR
	'vue-components/navbar/sub-components/mobile-navbar/js/mobile-navbar'
	
], function(Vue, Legacy, Shared, DesktopNavbar, MobileNavbar){
    'use strict';
    var VueNavbar;
    //
    VueNavbar = {
        Navbar: Vue.component('navbar', {
            template:'#navbar-component-template',
            props: ['vm']
        }),
        Legacy: Legacy,
        Shared: Shared,
        DesktopNavbar: DesktopNavbar,
        MobileNavbar: MobileNavbar
    };
    //
    return VueNavbar;
});