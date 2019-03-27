define([
	'vue-components/navbar/sub-components/shared/sub-components/logo-image/js/logo-image',
	'vue-components/navbar/sub-components/shared/sub-components/blogs-navbar/js/blogs-navbar',
	'vue-components/navbar/sub-components/shared/sub-components/TypeAhead/js/TypeAhead',
	'vue-components/navbar/sub-components/shared/sub-components/navbar-typeahead/js/navbar-typeahead'
],

function SharedComponent(VueLogoImageComponent, VueBlogsNavbarComponent, VueTypeAhead, VueNavbarTypeahead) {
	'use strict';
	var NavbarSharedComponents;
	//
	NavbarSharedComponents = {
		LogoImage : VueLogoImageComponent,
		BlogsNavBar : VueBlogsNavbarComponent,
		TypeAhead : VueTypeAhead,
		VueNavbarTypeahead: VueNavbarTypeahead
	};
	//
	return NavbarSharedComponents;
}

);
