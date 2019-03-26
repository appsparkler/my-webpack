define(['vue'], function(Vue){
    'use strict';
    var VueNavList;
    //
    VueNavList = Vue.component('nav-list', {
        template:'#nav-list-component-template',
        props: ['vm']
    });
    //
    return VueNavList;
});