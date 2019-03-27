define([
    'vue'
], function(Vue){
    'use strict';
    var NavFlyoutCell;
    //
    NavFlyoutCell = Vue.component('nav-flyout-cell', {
        template:'#nav-flyout-cell-component-template',
        props: ['vm']
    });
    //
    return NavFlyoutCell;
});