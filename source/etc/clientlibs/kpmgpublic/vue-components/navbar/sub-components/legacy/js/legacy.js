define([
	'vue-components/navbar/sub-components/legacy/sub-components/legacy-nav-list-item/js/legacy-nav-list-item',
	'vue-components/navbar/sub-components/legacy/sub-components/legacy-logout-link/js/legacy-logout-link',
    'vue-components/navbar/sub-components/legacy/sub-components/legacy-learn-more-trigger/js/legacy-learn-more-trigger'
],

function (VueLegacyNavListItem, LegacyLogoutLink, LegacyLearnMoreTrigger) {
	'use strict';
	var LegacyCompatibleComponents;
	//
	LegacyCompatibleComponents = {
		'VueLegacyNavListItem' : VueLegacyNavListItem,
		'LegacyLogoutLink': LegacyLogoutLink,
        'LegacyLearnMoreTrigger': LegacyLearnMoreTrigger
	};
	//
	return LegacyCompatibleComponents;
}

);