define(['vue','personalizationUtils','jquery'], 

function (Vue, personalizationUtils, $ ){
	'use strict';
	//
	var VueInterestSummaryComponent;
	//	
	VueInterestSummaryComponent = Vue.component('interest-summary',{
		template: '#interest-summary-component-template',
		props: ['vm'],
		mounted: mountedCallback
	});
	//
	return VueInterestSummaryComponent;

	// private functions
	function mountedCallback() {

		if(personalizationUtils.accountUtils.getPreferencesCount().total <= $(".threshold-value").text()){
			$(".interest-summary-component .interest-exists").hide();
        }else{
			$(".interest-summary-component .interest-exists").show();
		}
	}
}

);