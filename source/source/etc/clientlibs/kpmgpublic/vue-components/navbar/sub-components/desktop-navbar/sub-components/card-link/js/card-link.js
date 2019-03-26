define(['vue'], function(Vue){
    'use strict';
    var VueCardLinkComponent;
    //
    VueCardLinkComponent = Vue.component('card-link', {
        template: '#card-link-component-template',
        props: ['vm']
    });
    //
    return VueCardLinkComponent;
});