define(['vue'], function(Vue){
    'use strict';
    var VuePromotionalComponent;
    //
    VuePromotionalComponent = Vue.component('promotional', {
        template:'#promotional-component-template',
        props: ['vm'],
        data: function() {
            var data;
            //
            data = {
                loggedIn : false,
                unKnownUser: false,
                newUser: false,
                nonNewUser: false
            };
            //
            return data;
        },
        mounted: mountedCallBack
    });
    //
    function mountedCallBack() {
        /*jshint validthis:true */
        var storageKey = 'loginCount' + JSON.parse(localStorage.getItem("accountInfo")).UID,
            preferencesCount = this.$store.state.data.personalization.personalizationUtils.preferencesCount.total,
            loggedIn = this.$store.state.data.personalization.personalizationUtils.isUserLoggedIn,
            self = this;
        if(loggedIn) {
            this.loggedIn = loggedIn;
            localStorage[storageKey] = localStorage[storageKey] || '0';
            if (parseInt(localStorage[storageKey]) < 5 && preferencesCount === 0) {
                this.newUser = true;
            } else {
                this.nonNewUser = true;
            }
        } else {
            this.unKnownUser = true;
        }
        setTimeout(function(){
            $(".nonNewUser").parents('.promotional-component').css('cursor','pointer');
            $(".nonNewUser").parents('.promotional-component').on('click', function() {
                window.location = window.location.origin + self.vm.linkUrl;
                return false;
            });
        });
        $(".promotional-component a").on('click', function(e){
            e.stopPropagation();
        });
    }
    return VuePromotionalComponent;
});
