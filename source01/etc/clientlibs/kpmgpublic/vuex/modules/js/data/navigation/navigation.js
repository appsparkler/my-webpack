define([
        'vuex-navigation-state',
        'vuex-navigation-actions',
        'vuex-navigation-mutations',
        'vuex-navigation-getters'
       ],


function VuexNavigationModule (state, actions, mutations, getters) {
	var NAVIGATION_MODULE;
	//
	NAVIGATION_MODULE = {
		namespaced: true,
		state: state,
		getters: getters,
		mutations: mutations,
        actions: actions
	};
	//
	return NAVIGATION_MODULE;
});
