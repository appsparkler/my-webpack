define([
    'vuex-personalization-state',
    'vuex-personalization-actions',
    'vuex-personalization-mutations'
],


function VuexPersonalizationModule(state, actions, mutations) {
	var PersonalizationModule;
	//	
	preparePersonalizationModule();
	//
	return PersonalizationModule;
	// private functions
	function preparePersonalizationModule() {
		PersonalizationModule = {
			namespaced: true,
			state: state,
			actions: actions,
			mutations: mutations
		};
	}
});
