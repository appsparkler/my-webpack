define([
    'vue'
], 

function(Vue){
    'use strict';
    var VueNavFlyoutFullbleed;
    //
    VueNavFlyoutFullbleed = Vue.component('nav-flyout-fullbleed', {
        template:'#nav-flyout-fullbleed-component-template',
        props: ['vm'],
        computed: {
            showFlyout: showFlyout
        }
    });
   //
    return VueNavFlyoutFullbleed;
    // private functions
    function showFlyout() {
        /* jshint validthis:true */
        var hasNavListOnCellOneWithLinks, isSiteSelector;
        isSiteSelector = (this.vm.cell1.type === "site-selector-menu");
        if (isSiteSelector) {
            return true;
        } else {
            hasNavListOnCellOneWithLinks = (this.vm.cell1.type === 'nav-list' && this.vm.cell1.links.length);
            return hasNavListOnCellOneWithLinks;    
        }
        
    }
}


);