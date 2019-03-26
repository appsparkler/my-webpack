define(['vue'], function(Vue){
    'use strict';
    var VueMobileSecondaryNavList;
    //
    VueMobileSecondaryNavList = Vue.component('mobile-secondary-nav-list', {
        template:'#mobile-secondary-nav-list-component-template',
        props: ['vm']
    });
    //
    return VueMobileSecondaryNavList;
});