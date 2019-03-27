define(['vue'], function(Vue){
    'use strict';
    var VueBlogsNavBar;
    //
    VueBlogsNavBar = Vue.component('blogs-navbar', {
        template:'#blogs-navbar-component-template',
        props: ['vm']
    });
    //
    return VueBlogsNavBar;
});
