define(['vue'], function(Vue){
    'use strict';
    var VueNavbarNavComponent;
    //
    VueNavbarNavComponent = Vue.component('navbar-nav', {
        template:'#navbar-nav-component-template',
        props: ['vm']
    });
    //
    return VueNavbarNavComponent;
});