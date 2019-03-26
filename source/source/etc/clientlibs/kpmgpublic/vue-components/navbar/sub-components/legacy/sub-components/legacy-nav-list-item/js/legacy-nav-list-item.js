define(['vue'], function(Vue){
    'use strict';
    var VueLegacyNavListItem;
    //
    VueLegacyNavListItem = Vue.component('legacy-nav-list-item', {
        template:'#legacy-nav-list-item-component-template',
        props: ['vm']
    });
    //
    return VueLegacyNavListItem;
});