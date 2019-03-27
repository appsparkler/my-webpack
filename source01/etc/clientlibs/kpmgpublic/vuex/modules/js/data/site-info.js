define(['jquery'], 

function VuexSiteInfoModule($) {
	var siteInfoModule, siteInfoState;
	//
	siteInfoState = {};
	//
	setAssetsDomainOnState();
	//
	siteInfoModule = {
		state: siteInfoState
	}
	//
	return siteInfoModule;
	//
	// private functions
	function setAssetsDomainOnState() {
		var CONTEXT, siteInfo;
		//
		CONTEXT = "#navigation-v2-data";
		//
		siteInfo = $('#navigation-v2-data').data('siteInfo');
        siteInfo.origin = window.location.origin;
		//
		siteInfoState = siteInfo;
	}
}



)