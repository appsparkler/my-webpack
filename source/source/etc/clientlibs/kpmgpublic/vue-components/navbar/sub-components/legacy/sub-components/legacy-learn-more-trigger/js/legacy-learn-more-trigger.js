define(['vue'], function(Vue){
    'use strict';
    var LegacyLearnMoreTrigger;
    //
    LegacyLearnMoreTrigger = Vue.component('legacy-learn-more-trigger', {
        template:'#legacy-learn-more-trigger-component-template',
        props: ['vm']
    });
    //
    return LegacyLearnMoreTrigger;
});