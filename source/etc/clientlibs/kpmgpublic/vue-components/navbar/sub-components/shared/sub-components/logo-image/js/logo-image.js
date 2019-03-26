define(['vue'], function(Vue){
    'use strict';
    var VueLogoImage;
    //
    VueLogoImage = Vue.component('logo-image', {
        template:'#logo-image-component-template',
        props: ['vm']
    });
    //
    return VueLogoImage;
});