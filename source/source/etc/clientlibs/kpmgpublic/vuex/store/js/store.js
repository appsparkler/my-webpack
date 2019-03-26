define(['vuex', 'vue', 'vuex-data-module', 'vuex-components-module'],


	function VuexStore(Vuex, Vue, VuexDataModule, VuexComponentsModule) {
		'use strict';
		//
		var storeConfig;
		//
		// Initialize Vuex
		Vue.use(Vuex);
		//
		storeConfig = {
			state: {},
			actions: {},
			mutations: {},
			modules: {
				data: VuexDataModule,
                components: VuexComponentsModule
			}
		};
		//
		return new Vuex.Store(storeConfig);
	}
);