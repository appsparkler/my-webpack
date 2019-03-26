define([], function(){
    return {
        'SET_IS_USER_LOGGED_IN': SET_IS_USER_LOGGED_IN,
        'SET_ACCOUNT_INFO': SET_ACCOUNT_INFO,
        'SET_PERSONALIZATION_UTILS_DATA': SET_PERSONALIZATION_UTILS_DATA,
        'SET_PRIVACY_POLICY_ACCEPTED_BOOLEAN': SET_PRIVACY_POLICY_ACCEPTED_BOOLEAN,
        'SET_SNP_RESULTS_OBJECT': SET_SNP_RESULTS_OBJECT,
        'SET_LINKS_JSON': SET_LINKS_JSON,
        'SHIFT_SNP_RESULTS': SHIFT_SNP_RESULTS,
        'SET_PREFERENCES_COUNT': SET_PREFERENCES_COUNT
    };
    // private functions
    function SET_IS_USER_LOGGED_IN(state, payload) {
		state.personalizationUtils.isUserLoggedIn = payload;
	}
    
    function SET_ACCOUNT_INFO(state, payload) {
		state.personalizationUtils.accountInfo = payload;
    }
        
    function SET_PERSONALIZATION_UTILS_DATA(state, payload) {
		state.personalizationUtils.preferencesCount = payload.preferencesCount;
	}
        
    function SET_PRIVACY_POLICY_ACCEPTED_BOOLEAN(state, payload) {
        state.personalizationUtils.privacyPolicyAccepted = payload;
    }
        
    function SET_SNP_RESULTS_OBJECT(state, payload) {
        state.snpResults = payload;
    }
        
    function SET_LINKS_JSON(state, payload) {
        state.personalizationUtils.linksJSON = payload;   
    }
    
    function SHIFT_SNP_RESULTS(state, payload) {
        state.snpResults["personalized-results"].resultset.results.result.shift();
    }
    
    function SET_PREFERENCES_COUNT(state, payload) {
        state.personalizationUtils.preferencesCount = payload;
    }

});