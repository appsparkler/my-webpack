define(['vue', 'mykpmgflyout'],


function(Vue, MyKpmgFlyout) {
	'use strict';
	//
	var VueLegacyLogoutLinkComponent;
	//
	VueLegacyLogoutLinkComponent = Vue.component('legacy-logout-link', {
		template: '#legacy-logout-link-component-template',
		props: ['vm'],
		methods: {
			logoutUser: function() {
				MyKpmgFlyout();
				//Check if user has made any changes in interests || preferences
				if( window.kpmgPersonalize.interestsChange || window.kpmgPersonalize.preferenceChange ) {
					$(document).trigger('logout.click');
					return false;
				}
				if (typeof event !== "undefined"){ event.stopPropagation(); }
				MyKpmgFlyout.logoutUser();
			}
		}
	});
	//
	return VueLegacyLogoutLinkComponent;
}

);
