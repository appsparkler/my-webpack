define(['jquery'], function ($) {
    return {
        i18nLabels: getI18nLabels(),
        snpResults: {},
        personalizationUtils: {
            accountInfo: {},
            preferencesCount: {},
            isUserLoggedIn: null,
            privacyPolicyAccepted: undefined,
            linksJSON: {}
        }
    };
    // private functions
    function getI18nLabels() {
        var i18nLabels;
        //
        i18nLabels = $('#navigation-v2-data-i18n-labels').data('i18nLabels');
        //
        return i18nLabels;
    }
});
