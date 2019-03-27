define(['vue'], function(Vue){
    'use strict';
    var VueSiteSelectorList;
    //
    VueSiteSelectorList = Vue.component('site-selector-list', {
        template:'#site-selector-list-component-template',
        props: ['vm']
    });
    //
    return VueSiteSelectorList;
});