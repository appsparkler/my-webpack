define(['vue'], function(Vue){
    'use strict';
    var VueNavbarIkonMenu;
    //
    VueNavbarIkonMenu = Vue.component('navbar-ikon-menu', {
        template:'#navbar-ikon-menu-component-template',
        props: ['vm']
    });
    //
    return VueNavbarIkonMenu;
});