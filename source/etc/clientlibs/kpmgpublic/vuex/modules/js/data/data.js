define([
	'vuex-search-module',
	'vuex-personalization-module',
	'vuex-navigation-module', 
	'vuex-site-info-module'
], 

function VuexDataModule(VuexSearchModule, VuexPersonalizationModule, VuexNavigationModule, VuexSiteInfoModule) {
	var dataModule;
	//
	dataModule = {
		namespaced: true,
		modules: {
			personalization: VuexPersonalizationModule,
			navigation: VuexNavigationModule,
			siteInfo: VuexSiteInfoModule,
			search: VuexSearchModule
		}
	};
	//
	return dataModule;
}



)