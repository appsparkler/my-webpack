define([
	'vue',
	'jquery',
	'vue-components/navbar/js/navbar-helpers'
], function (Vue, $, NavbarHelpers) {
    'use strict';
    var VueNavbarNavListItemComponent;
    //
    VueNavbarNavListItemComponent = Vue.component('navbar-nav-list-item', {
        template: '#navbar-nav-list-item-component-template',
        props: ['vm'],
        mounted: componentMountedCallback,
        methods: {
            addActiveClass: addActiveClass,
            removeActiveClass: removeActiveClass,
            tabBlurAction: tabBlurAction,
            addActiveClassOnTabFocus: addActiveClassOnTabFocus
        }
    });

    function addActiveClassOnTabFocus(evt) {
        $(evt.currentTarget).parent().siblings().removeClass('active');
        $(evt.currentTarget).parent().addClass('active');
    }
    //
    function addActiveClass(evt) {
        $(evt.currentTarget).parent().siblings().removeClass('active');
        $(evt.currentTarget).addClass('active');
    }

    function removeActiveClass(evt) {
        $(evt.currentTarget).removeClass('active');
    }
    // private functions
    function componentMountedCallback() {
        /*jshint validthis:true */
        var isAuthor;
        //
        isAuthor = this.$store.state.data.siteInfo.isAuthor;
        //
        if (isAuthor) {
            NavbarHelpers
                .rearrangeAuthorComponentDialog(this);
        }
    }

    function checkToggleMethod(evt) {
        $(evt.target).parent().parent().siblings().removeClass('active');
        $(evt.target).parent().addClass('active');
    }

    function tabBlurAction(evt) {
        var relatedTargetParents, targetParent, isRelatedTargetParentInTargetParent;
        //
        targetParent = $(evt.target).parent();
        relatedTargetParents = $(evt.relatedTarget).parents();
        isRelatedTargetParentInTargetParent = $.inArray(targetParent[0], relatedTargetParents) > -1;
        //
        if (!isRelatedTargetParentInTargetParent) {
            $(evt.target).parent().removeClass('active');
        }
    }
    //
    return VueNavbarNavListItemComponent;
});
