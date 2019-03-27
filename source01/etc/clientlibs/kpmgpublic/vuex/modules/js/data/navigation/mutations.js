define([], function(){
    return {
        'SET_PERSONALIZED_SITE_STATE': SET_PERSONALIZED_SITE_STATE,
        'SET_NON_PERSONALIZED_SITE_STATE': SET_NON_PERSONALIZED_SITE_STATE,
        'SET_AUTHENTICATED_STATE': SET_AUTHENTICATED_STATE,
        'SET_UNAUTHENTICATED_STATE': SET_UNAUTHENTICATED_STATE,
        'PERSONALIZE_NAVBAR_NAV_CELL': PERSONALIZE_NAVBAR_NAV_CELL,
        'PERSONALIZE_ACCOUNT_ACTION_LIST_NAV_CELL': PERSONALIZE_ACCOUNT_ACTION_LIST_NAV_CELL,
        'PERSONALIZE_SITE_SELECTOR_CELL3': PERSONALIZE_SITE_SELECTOR_CELL3,
        'SET_SITE_SELECTOR_CARD': SET_SITE_SELECTOR_CARD,
        'SET_PROMOTIONAL_CELL': SET_PROMOTIONAL_CELL,
        'SET_INTEREST_SUMMARY_CELL': SET_INTEREST_SUMMARY_CELL
    };
    // private functions
    function SET_AUTHENTICATED_STATE(state, payload){
        state.accountActionList.flyout.cell1.links = payload.loggedInLinks;
		state.accountActionList.iconStyle = state.mobileTabs.userProfile.icon = payload.iconStyle;
    }
    
    function SET_PERSONALIZED_SITE_STATE(state) {
        state.accountActionList.isVisible = true;
        state.mobileTabs.userProfile.isVisible = true;
    }
    
    function SET_NON_PERSONALIZED_SITE_STATE(state, payload) {
        state.accountActionList.isVisible = false;
        state.mobileTabs.userProfile.isVisible = false;
    }
    
    function SET_UNAUTHENTICATED_STATE(state, payload) {
		state.accountActionList.flyout.cell1.links = payload.loggedOutLinks;
		state.accountActionList.iconStyle = payload.iconStyle;
		
        //analytics object update
        // TODO, this needs to be handled elsewhere.
		if(!window.kpmgPersonalize.misc.isAuthor){
            window.digitalData.user.gigyaID = '';
            window.digitalData.login={
                loginStatus:'Logged-Out'
            };
        }
	}
    
    function PERSONALIZE_NAVBAR_NAV_CELL(state, payload) {
        state.navbarNav[payload.cellPath].flyout.cell3 = payload.personalizedCardLink;
    }
    
    function PERSONALIZE_ACCOUNT_ACTION_LIST_NAV_CELL(state, payload) {
        state.accountActionList.flyout[payload.cell] = payload.personalizedCardLink;
    }
    
    function PERSONALIZE_SITE_SELECTOR_CELL3(state, payload) {
        state.siteSelectorList.flyout.cell3 = payload;
    }
    
    function SET_SITE_SELECTOR_CARD(state, payload) {
        state.siteSelectorList.flyout.cell2 = payload;
    }
    
    function SET_PROMOTIONAL_CELL(state, payload){
        state.accountActionList.flyout.cell2 = payload; 
    }
    
    function SET_INTEREST_SUMMARY_CELL(state, payload) {
        state.accountActionList.flyout.cell3 = payload;
    }
});